# brproxy

A library for injecting an http proxy into the browser.

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


## Features and bugs

Please file feature requests and bugs at the [issue tracker][tracker].

[tracker]: https://github.com/nameitlater/brproxy/issues
