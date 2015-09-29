// Copyright (c) 2015, the Name It Later brproxy authors (see the AUTHORS file).
// All rights reserved. Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file.

/// The brproxy library.
library brproxy;

import 'dart:js';

set remote(String remote){
  context['brproxy']['remote'] = remote;
}

String get remote {
  return context['brproxy']['remote'];
}

start(){
  return context['brproxy'].callMethod('start',[]);
}

stop(){
  return context['brproxy'].callMethod('stop',[]);
}






