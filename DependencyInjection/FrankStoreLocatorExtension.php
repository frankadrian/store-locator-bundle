<?php

namespace Frank\StoreLocatorBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class FrankStoreLocatorExtension extends Extension implements PrependExtensionInterface
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\XmlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.xml');
    }

    /**
     * Allow an extension to prepend the extension configurations.
     *
     * @param ContainerBuilder $container
     */
    public function prepend(ContainerBuilder $container)
    {
        $con = array(
            'orm' => array(
                'dql' => array(
                    'numeric_functions' => array(
                        'acos' => 'DoctrineExtensions\Query\Mysql\Acos',
                        'cos'  => 'DoctrineExtensions\Query\Mysql\Cos',
                        'sin'  => 'DoctrineExtensions\Query\Mysql\Sin'
                    ),
                    'string_functions'  => array('radians' => 'DoctrineExtensions\Query\Mysql\Radians')
                )
            )
        );

        //add extensions needed to doctrine
        $container->prependExtensionConfig('doctrine', $con);

    }
}
