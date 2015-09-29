// Copyright (c) 2015, <your name>. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.
@TestOn('browser')
library brproxy.test;

import 'package:brproxy/brproxy.dart' as brp;
import 'package:test/test.dart';
import 'package:http/browser_client.dart';
import 'dart:js';
import 'dart:async';

void main() {
  group('basic tests', () {

    setUp((){
      brp.start();
      brp.remote = "";
    });

    tearDown((){
      brp.stop();
    });

    test('should set remote', () {
     brp.remote = "http://localhost:8080";
      expect(brp.remote, equals("http://localhost:8080"));
    });

    test('should proxy traffic to remote', () async {
      brp.remote = "https://cors-test.appspot.com";
      var client = new JsObject(context["XMLHttpRequest"], []);
      client.callMethod('open',['GET','http://host.invalid/test']);

      var completer = new Completer();

      client.callMethod('addEventListener', ['load',(e){
        completer.complete();
      }]);
      client.callMethod('addEventListener', ['error',(e){
        completer.completeError(e);
      }]);

      client.callMethod('send',[]);

      var response = await completer.future;
      expect(client.callMethod('response',[]),equals('{"status":"ok"}'));
    });

    test('should proxy subdomain traffic to remote', () async {
      brp.remote = "https://cors-test.appspot.com";

      var client = new JsObject(context["XMLHttpRequest"], []);
      client.callMethod('open',['GET','http://sub.host.invalid/test']);

      var completer = new Completer();

      client.callMethod('addEventListener', ['load',(e){
        completer.complete();
      }]);
      client.callMethod('addEventListener', ['error',(e){
        completer.completeError(e);
      }]);

      client.callMethod('send',[]);

      var response = await completer.future;
      expect(client.callMethod('response',[]),equals('{"status":"ok"}'));
    });

    test('should proxy port traffic to remote', () async {
      brp.remote = "https://cors-test.appspot.com";

      var client = new JsObject(context["XMLHttpRequest"], []);
      client.callMethod('open',['GET','http://sub.host.invalid:8080/test']);

      var completer = new Completer();

      client.callMethod('addEventListener', ['load',(e){
        completer.complete();
      }]);
      client.callMethod('addEventListener', ['error',(e){
        completer.completeError(e);
      }]);

      client.callMethod('send',[]);

      var response = await completer.future;
      expect(client.callMethod('response',[]),equals('{"status":"ok"}'));
    });

    test('should work when no remote specified', () async {

      var client = new JsObject(context["XMLHttpRequest"], []);
      client.callMethod('open',['GET','https://cors-test.appspot.com/test']);

      var completer = new Completer();

      client.callMethod('addEventListener', ['load',(e){
        completer.complete();
      }]);
      client.callMethod('addEventListener', ['error',(e){
        completer.completeError(e);
      }]);

      client.callMethod('send',[]);

      var response = await completer.future;
      expect(client.callMethod('response',[]),equals('{"status":"ok"}'));
    });



  });
}
