# brproxy

A library for injecting an http request proxy into the browser.

## Motivation

As a developer, I wanted to be able to right click on my entry-point in WebStorm and have AJAX requests routed to an actual
backend with minimal fuss.  Neither [WebStorm](https://youtrack.jetbrains.com/issue/WEB-11178) nor Pub support reverse proxying, so implementing a browser-based reverse proxy seemed a reasonable solution.  

## Usage
1. Add the script to your entrypoint

    ```
    <script src="packages/brproxy/brproxy.js"></script>
    ```
2. Set the remote and start the proxy

    ```
    import 'package:brproxy/brproxy.dart' as brp;

    main(){
        brp.remote = "https://cors-test.appspot.com";
        brp.start();
    }
    ```
    
## Limitations
This package will not proxy for HttpRequest in Dartium.  The Dart definition of the DOM API's is seperate from JavaScript definition. See issue [24462](https://github.com/dart-lang/sdk/issues/24462). It might be reasonable at some point in time to create a drop in replacement for BrowserClient as a workaround.

## Features and bugs

Please file feature requests and bugs at the [issue tracker][tracker].

[tracker]: https://github.com/nameitlater/brproxy/issues
