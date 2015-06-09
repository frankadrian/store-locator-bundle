<?php

/*
 * This file is part of the Terrific Core Bundle.
 *
 * (c) Remo Brunschwiler <remo@terrifically.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Frank\StoreLocatorBundle\Twig;


class StoreLocatorExtension extends \Twig_Extension
{
    /**
     * @var \Symfony\Component\HttpKernel\KernelInterface
     */
    private $kernel;

    /*public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }*/

    /**
     * {@inheritdoc}
     */
    function initRuntime(\Twig_Environment $environment)
    {
        // extend the loader paths
        $currentLoader = $environment->getLoader();
        $currentLoader->setPaths(array_merge($currentLoader->getPaths(), array(__DIR__)));

        // load the core macros
        $environment->addGlobal('storelocator', $environment->loadTemplate('macros.html.twig'));
    }

    /**
     * {@inheritdoc}
     */
    public function getFilters()
    {
        return array(
        );
    }

    /**
     * {@inheritdoc}
     */
    function getName()
    {
        return 'store_locator_core';
    }
}



