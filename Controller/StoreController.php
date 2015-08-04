<?php

namespace Frank\StoreLocatorBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Store controller.
 *
 * @Route("/store")
 */
class StoreController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }

    /**
     * @Route("/search")
     * @Method("POST")
     */
    public function searchAction(Request $request)
    {

        $lat  = $request->get('lat');
        $long  = $request->get('lng');
        $radius  = $request->get('radius');

        $em = $this->getDoctrine()->getManager();
        $results = $em->getRepository('FrankStoreLocatorBundle:Store')->search($lat, $long, $radius);

        return new JsonResponse(array('data' => $results));
    }
}
