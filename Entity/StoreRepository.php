<?php
/**
 * Created by PhpStorm.
 * User: frank
 * Date: 08.06.15
 * Time: 20:48
 */

namespace Frank\StoreLocatorBundle\Entity;

use Doctrine\ORM\EntityRepository;

class StoreRepository extends EntityRepository
{

    public function search($lat, $long, $radius)
    {

        $qb = $this->_em->createQueryBuilder();

        return $qb->select('s.address, s.name, s.latitude, s.longitude')
                  ->addSelect(
                      "( 3959 * acos( cos( radians( :lat ) ) *
                         cos( radians( s.latitude ) ) *
                         cos( radians( s.longitude ) - radians( :long ) ) + sin( radians( :lat ) ) *
                         sin( radians( s.latitude ) ) ) ) AS distance"
                  )
                  ->groupBy('s.id')
                  ->having("distance < :radius")
                  ->from('FrankStoreLocatorBundle:Store', 's')
                  ->setParameters(
                      array(
                          'lat'    => $lat,
                          'long'   => $long,
                          'radius' => $radius
                      )
                  )
                  ->getQuery()
                  ->getResult();
    }
}
