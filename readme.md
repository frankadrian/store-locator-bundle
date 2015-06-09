StoreLocator Bundle
===================


About
-----

This Bundle provides a backend interface to create "Stores", for which you can specify a name, address and click on a google map
to determine the coordinates for the location. Then it provides a very basic frontend view view to search for stores.


Install 
=======

1) install bundle via composer:

add to composer.json

    "repositories": [
        {
            "type": "vcs",
            "url":  "https://github.com/frankadrian/store-locator-bundle.git"
        }
    ],
    
and under the require section:

      "frankadrian/store-locator-bundle": "dev-master",

then run `composer up`


2) Add to AppKernel.php

    ...
        new Frank\StoreLocatorBundle\FrankStoreLocatorBundle(),
    ...

3) load default routing
    
    frank_store_locator:
        resource: "@FrankStoreLocatorBundle/Controller/"
        type:     annotation
        prefix:   /

4) Update database
    
    app/console  doctrine:schema:update  --force
    
5) start server 

    app/console server:run

6) browse to `http://127.0.0.1:8000/admin/store/` to create stores
and after that they can be found at `http://127.0.0.1:8000/store/`

