/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/*
 * Source code modified from
 * https://github.com/Ciarands/rabbit_wasm
 *
 * The idea is to load the wasm of rabbitstream and
 * reproduce the behaviour of the original script
 * to get kid and kversion and decrypt the url
 */

import CryptoJS from 'crypto-js';
import { data1, data2, data3, dataURL1, dataURL2 } from '@constants/rabitstream';

async function stream(xrax, MEGA = 0) {
  try {
    var __awaiter =
      (this && this.__awaiter) ||
      function (thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P
            ? value
            : new P(function (resolve) {
                resolve(value);
              });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator['throw'](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
    var __generator =
      (this && this.__generator) ||
      function (thisArg, body) {
        var _ = {
            label: 0,
            sent: function () {
              if (t[0] & 1) throw t[1];
              return t[1];
            },
            trys: [],
            ops: [],
          } as any,
          f,
          y,
          t,
          g;
        return (
          (g = { next: verb(0), throw: verb(1), return: verb(2) }),
          typeof Symbol === 'function' &&
            (g[Symbol.iterator] = function () {
              return this;
            }),
          g
        );
        function verb(n) {
          return function (v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f) throw new TypeError('Generator is already executing.');
          while ((g && ((g = 0), op[0] && (_ = 0)), _))
            try {
              if (
                ((f = 1),
                y &&
                  (t =
                    op[0] & 2
                      ? y['return']
                      : op[0]
                        ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                        : y.next) &&
                  !(t = t.call(y, op[1])).done)
              )
                return t;
              if (((y = 0), t)) op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (
                    !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                    (op[0] === 6 || op[0] === 2)
                  ) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2]) _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5) throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
    var __spreadArray =
      (this && this.__spreadArray) ||
      function (to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };

    var base_url = 'https://rabbitstream.net/v2/embed-4/mcAWNPptFcOb?z=';
    var embed_url = 'https://rabbitstream.net/v2/embed-4/';
    var origin = 'https://rabbitstream.net';
    var get_sources_url = 'https://rabbitstream.net/ajax/v2/embed-4/getSources?id=';
    var wasm_url = 'https://rabbitstream.net/images/image.png?v=0.1.4';
    var loading_url = 'https://rabbitstream.net/images/loading.png?v=0.6';
    var referrer = 'https://flixhq.to/';
    var data = new Uint8ClampedArray(data1);
    let dataURL = dataURL1;
    var user_agent = 'Mozilla/5.0 (X11; Linux x86_64; rv:125.0) Gecko/20100101 Firefox/125.0';

    if (MEGA == 1) {
      base_url = 'https://megacloud.tv/embed-1/e-1/ylNivEXuxrhG?z=';
      embed_url = 'https://megacloud.tv/embed-1/e-1/';
      origin = 'https://megacloud.tv';
      get_sources_url = 'https://megacloud.tv/embed-1/ajax/e-1/getSources?id=';
      wasm_url = 'https://megacloud.tv/images/image.png?v=0.0.8';
      loading_url = 'https://megacloud.tv/images/loading.png?v=0.7';
      referrer = 'https://myflixerz.to/';
      data = new Uint8ClampedArray(data2);
      data = new Uint8ClampedArray(data3);

      dataURL = dataURL2;
      user_agent =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36';
    }

    var wasm;
    var arr = new Array(128).fill(void 0);
    var dateNow = Date.now();
    var content;
    var meta = {
      content: content,
    };
    var image_data = {
      height: 50,
      width: 65,
      data: data,
    };

    var canvas = {
      baseUrl: base_url,
      width: 0,
      height: 0,
      style: {
        style: {
          display: 'inline',
        },
      },
    };
    var fake_window = {
      localStorage: {
        setItem: function (item, value) {
          fake_window.localStorage[item] = value;
        },
      },
      navigator: {
        webdriver: false,
        userAgent: user_agent,
      },
      length: 0,
      document: {
        cookie: '',
      },
      origin: origin,
      location: {
        href: base_url,
        origin: origin,
      },
      performance: {
        timeOrigin: dateNow,
      },
      xrax: '',
    } as any;
    var nodeList = {
      image: {
        src: wasm_url,
        height: 55,
        width: 65,
        complete: true,
      },
      context2d: {},
      length: 1,
    };
    function get(index) {
      return arr[index];
    }
    arr.push(void 0, null, true, false);
    var size = 0;
    var memoryBuff;
    //fix this
    function getMemBuff() {
      return (memoryBuff =
        null !== memoryBuff && 0 !== memoryBuff.byteLength
          ? memoryBuff
          : new Uint8Array(wasm.memory.buffer));
    }
    var encoder = new TextEncoder();
    var encode = function (text, array) {
      return encoder.encodeInto(text, array);
    };
    function parse(text, func, func2) {
      if (void 0 === func2) {
        var encoded = encoder.encode(text);
        var parsedIndex = func(encoded.length, 1) >>> 0;
        return (
          getMemBuff()
            .subarray(parsedIndex, parsedIndex + encoded.length)
            .set(encoded),
          (size = encoded.length),
          parsedIndex
        );
      }
      var len = text.length;
      var parsedLen = func(len, 1) >>> 0;
      var new_arr = getMemBuff();
      var i = 0;
      for (; i < len; i++) {
        var char = text.charCodeAt(i);
        if (127 < char) {
          break;
        }
        new_arr[parsedLen + i] = char;
      }
      return (
        i !== len &&
          (0 !== i && (text = text.slice(i)),
          (parsedLen = func2(parsedLen, len, (len = i + 3 * text.length), 1) >>> 0),
          (encoded = getMemBuff().subarray(parsedLen + i, parsedLen + len)),
          (i += encode(text, encoded).written),
          (parsedLen = func2(parsedLen, len, i, 1) >>> 0)),
        (size = i),
        parsedLen
      );
    }
    var arr32;
    function isNull(test) {
      return null == test;
    }
    function getArr32() {
      return (arr32 =
        null !== arr32 && 0 !== arr32.byteLength ? arr32 : new Int32Array(wasm.memory.buffer));
    }
    var pointer = arr.length;
    function shift(QP) {
      QP < 132 || ((arr[QP] = pointer), (pointer = QP));
    }
    function shiftGet(QP) {
      var Qn = get(QP);
      return shift(QP), Qn;
    }
    var decoder = new TextDecoder('utf-8', {
      fatal: true,
      ignoreBOM: true,
    });
    function decodeSub(index, offset) {
      return (index >>>= 0), decoder.decode(getMemBuff().subarray(index, index + offset));
    }
    function addToStack(item) {
      pointer === arr.length && arr.push(arr.length + 1);
      var Qn = pointer;
      return (pointer = arr[Qn]), (arr[Qn] = item), Qn;
    }
    function args(QP, Qn, QT, func) {
      var Qx = {
        a: QP,
        b: Qn,
        cnt: 1,
        dtor: QT,
      };
      return (
        (QP = function () {
          var Qw = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            Qw[_i] = arguments[_i];
          }
          Qx.cnt++;
          try {
            return func.apply(void 0, __spreadArray([Qx.a, Qx.b], Qw, false));
          } finally {
            0 == --Qx.cnt && (wasm.__wbindgen_export_2.get(Qx.dtor)(Qx.a, Qx.b), (Qx.a = 0));
          }
        }),
        ((QP.original = Qx), QP)
      );
    }
    function export3(QP, Qn) {
      wasm.__wbindgen_export_3(QP, Qn);
    }
    function export4(QP, Qn) {
      return shiftGet(wasm.__wbindgen_export_4(QP, Qn));
    }
    function export5(QP, Qn, QT) {
      wasm.__wbindgen_export_5(QP, Qn, addToStack(QT));
    }
    function applyToWindow(func, args) {
      try {
        return func.apply(fake_window, args);
      } catch (error) {
        wasm.__wbindgen_export_6(addToStack(error));
      }
    }
    function Qj(QP, Qn) {
      return (Qn = Qn(+QP.length, 1) >>> 0), (getMemBuff().set(QP, Qn), (size = QP.length), Qn);
    }
    function QN(QP, Qn) {
      return __awaiter(this, void 0, void 0, function () {
        var QT, Qt, _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (!('function' == typeof Response && QP instanceof Response))
                return [3 /*break*/, 3];
              return [4 /*yield*/, QP.arrayBuffer()];
            case 1:
              QT = _b.sent();
              return [4 /*yield*/, WebAssembly.instantiate(QT, Qn)];
            case 2:
              _a = ((Qt = _b.sent()), Object.assign(Qt, { bytes: QT }));
              return [3 /*break*/, 5];
            case 3:
              return [4 /*yield*/, WebAssembly.instantiate(QP, Qn)];
            case 4:
              _a =
                (Qt = _b.sent()) instanceof WebAssembly.Instance
                  ? {
                      instance: Qt,
                      module: QP,
                    }
                  : Qt;
              _b.label = 5;
            case 5:
              return [2 /*return*/, _a];
          }
        });
      });
    }
    function initWasm() {
      var wasmObj = {
        wbg: {
          __wbindgen_string_get: function (offset, index) {
            var str = get(index);
            var val = parse(str, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = val;
          },
          __wbindgen_object_drop_ref: function (index) {
            shiftGet(index);
          },
          __wbindgen_cb_drop: function (index) {
            var org = shiftGet(index).original;
            return 1 == org.cnt-- && !(org.a = 0);
          },
          __wbindgen_string_new: function (index, offset) {
            return addToStack(decodeSub(index, offset));
          },
          __wbindgen_is_null: function (index) {
            return null === get(index);
          },
          __wbindgen_is_undefined: function (index) {
            return void 0 === get(index);
          },
          __wbindgen_boolean_get: function (index) {
            var bool = get(index);
            return 'boolean' == typeof bool ? (bool ? 1 : 0) : 2;
          },
          __wbg_instanceof_CanvasRenderingContext2d_4ec30ddd3f29f8f9: function () {
            return true;
          },
          __wbg_setfillStyle_59f426135f52910f: function () {},
          __wbg_setshadowBlur_229c56539d02f401: function () {},
          __wbg_setshadowColor_340d5290cdc4ae9d: function () {},
          __wbg_setfont_16d6e31e06a420a5: function () {},
          __wbg_settextBaseline_c3266d3bd4a6695c: function () {},
          __wbg_drawImage_cb13768a1bdc04bd: function () {},
          __wbg_getImageData_66269d289f37d3c7: function () {
            return applyToWindow(function () {
              return addToStack(image_data);
            }, arguments);
          },
          __wbg_rect_2fa1df87ef638738: function () {},
          __wbg_fillRect_4dd28e628381d240: function () {},
          __wbg_fillText_07e5da9e41652f20: function () {},
          __wbg_setProperty_5144ddce66bbde41: function () {},
          __wbg_createElement_03cf347ddad1c8c0: function () {
            return applyToWindow(function (index, decodeIndex, decodeIndexOffset) {
              return addToStack(canvas);
            }, arguments);
          },
          __wbg_querySelector_118a0639aa1f51cd: function () {
            return applyToWindow(function (index, decodeIndex, decodeOffset) {
              //let item = get(index).querySelector(decodeSub(decodeIndex, decodeOffset));
              //return isNull(item) ? 0 : addToStack(item);
              return addToStack(meta);
            }, arguments);
          },
          __wbg_querySelectorAll_50c79cd4f7573825: function () {
            return applyToWindow(function () {
              return addToStack(nodeList);
            }, arguments);
          },
          __wbg_getAttribute_706ae88bd37410fa: function (offset, index, decodeIndex, decodeOffset) {
            //let attr = get(index).getAttribute(decodeSub(decodeIndex, decodeOffset));
            var attr = meta.content;
            //todo!
            var todo = isNull(attr)
              ? 0
              : parse(attr, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = todo;
          },
          __wbg_target_6795373f170fd786: function (index) {
            var target = get(index).target;
            return isNull(target) ? 0 : addToStack(target);
          },
          __wbg_addEventListener_f984e99465a6a7f4: function () {},
          __wbg_instanceof_HtmlCanvasElement_1e81f71f630e46bc: function () {
            return true;
          },
          __wbg_setwidth_233645b297bb3318: function (index, set) {
            get(index).width = set >>> 0;
          },
          __wbg_setheight_fcb491cf54e3527c: function (index, set) {
            get(index).height = set >>> 0;
          },
          __wbg_getContext_dfc91ab0837db1d1: function () {
            return applyToWindow(function (index) {
              return addToStack(get(index).context2d);
            }, arguments);
          },
          __wbg_toDataURL_97b108dd1a4b7454: function () {
            return applyToWindow(function (offset) {
              var _dataUrl = parse(dataURL, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
              getArr32()[offset / 4 + 1] = size;
              getArr32()[offset / 4 + 0] = _dataUrl;
            }, arguments);
          },
          __wbg_instanceof_HtmlDocument_1100f8a983ca79f9: function () {
            return true;
          },
          __wbg_cookie_0ad89e781441fb95: function () {
            return applyToWindow(function (offset, index) {
              var _cookie = parse(
                get(index).cookie,
                wasm.__wbindgen_export_0,
                wasm.__wbindgen_export_1,
              );
              getArr32()[offset / 4 + 1] = size;
              getArr32()[offset / 4 + 0] = _cookie;
            }, arguments);
          },
          __wbg_style_ca229e3326b3c3fb: function (index) {
            addToStack(get(index).style);
          },
          __wbg_instanceof_HtmlImageElement_9c82d4e3651a8533: function () {
            return true;
          },
          __wbg_src_87a0e38af6229364: function (offset, index) {
            var _src = parse(get(index).src, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = _src;
          },
          __wbg_width_e1a38bdd483e1283: function (index) {
            return get(index).width;
          },
          __wbg_height_e4cc2294187313c9: function (index) {
            return get(index).height;
          },
          __wbg_complete_1162c2697406af11: function (index) {
            return get(index).complete;
          },
          __wbg_data_d34dc554f90b8652: function (offset, index) {
            var _data = Qj(get(index).data, wasm.__wbindgen_export_0);
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = _data;
          },
          __wbg_origin_305402044aa148ce: function () {
            return applyToWindow(function (offset, index) {
              var _origin = parse(
                get(index).origin,
                wasm.__wbindgen_export_0,
                wasm.__wbindgen_export_1,
              );
              getArr32()[offset / 4 + 1] = size;
              getArr32()[offset / 4 + 0] = _origin;
            }, arguments);
          },
          __wbg_length_8a9352f7b7360c37: function (index) {
            return get(index).length;
          },
          __wbg_get_c30ae0782d86747f: function (index) {
            var _image = get(index).image;
            return isNull(_image) ? 0 : addToStack(_image);
          },
          __wbg_timeOrigin_f462952854d802ec: function (index) {
            return get(index).timeOrigin;
          },
          __wbg_instanceof_Window_cee7a886d55e7df5: function () {
            return true;
          },
          __wbg_document_eb7fd66bde3ee213: function (index) {
            var _document = get(index).document;
            return isNull(_document) ? 0 : addToStack(_document);
          },
          __wbg_location_b17760ac7977a47a: function (index) {
            return addToStack(get(index).location);
          },
          __wbg_performance_4ca1873776fdb3d2: function (index) {
            var _performance = get(index).performance;
            return isNull(_performance) ? 0 : addToStack(_performance);
          },
          __wbg_origin_e1f8acdeb3a39a2b: function (offset, index) {
            var _origin = parse(
              get(index).origin,
              wasm.__wbindgen_export_0,
              wasm.__wbindgen_export_1,
            );
            getArr32()[offset / 4 + 1] = size;
            getArr32()[offset / 4 + 0] = _origin;
          },
          __wbg_get_8986951b1ee310e0: function (index) {
            var _xrax = get(index).xrax;
            return isNull(_xrax) ? 0 : addToStack(_xrax);
          },
          __wbg_setTimeout_6ed7182ebad5d297: function () {
            return applyToWindow(function () {
              return 10;
            }, arguments);
          },
          __wbg_self_05040bd9523805b9: function () {
            return applyToWindow(function () {
              return addToStack(fake_window);
            }, arguments);
          },
          __wbg_window_adc720039f2cb14f: function () {
            return applyToWindow(function () {
              return addToStack(fake_window);
            }, arguments);
          },
          __wbg_globalThis_622105db80c1457d: function () {
            return applyToWindow(function () {
              return addToStack(fake_window);
            }, arguments);
          },
          __wbg_global_f56b013ed9bcf359: function () {
            return applyToWindow(function () {
              return addToStack(fake_window);
            }, arguments);
          },
          __wbg_newnoargs_cfecb3965268594c: function (index, offset) {
            return addToStack(new Function(decodeSub(index, offset)));
          },
          __wbindgen_object_clone_ref: function (index) {
            return addToStack(get(index));
          },
          __wbg_eval_c824e170787ad184: function () {
            return applyToWindow(function (index, offset) {
              var payload = decodeSub(index, offset);
              var match = payload.match(/^(window\.\w+\.\w+)(?:\('([^']*)',\s'([^']*)'\))?$/);
              var spoofFunctions = {
                'window.navigator.webdriver': function () {
                  return fake_window.navigator.webdriver;
                },
                'window.navigator.userAgent': function () {
                  return fake_window.navigator.userAgent;
                },
                'window.localStorage.setItem': function (key, value) {
                  return fake_window.localStorage.setItem(key, value);
                },
              };
              if (match) {
                var _ = match[0],
                  funcKey = match[1],
                  key = match[2],
                  value = match[3];
                if (funcKey && spoofFunctions[funcKey]) {
                  if (key && value) {
                    spoofFunctions[funcKey](key, value);
                  } else {
                    var result = spoofFunctions[funcKey]();
                    return addToStack(result);
                  }
                } else {
                  console.error('Function for '.concat(funcKey, ' not found in spoofFunctions.'));
                }
              } else {
                //console.error("Invalid input string format: ".concat(payload));
              }
              return null;
            }, arguments);
          },
          __wbg_call_3f093dd26d5569f8: function () {
            return applyToWindow(function (index, index2) {
              return addToStack(get(index).call(get(index2)));
            }, arguments);
          },
          __wbg_set_961700853a212a39: function () {
            return applyToWindow(function (index, index2, index3) {
              return Reflect.set(get(index), get(index2), get(index3));
            }, arguments);
          },
          __wbg_buffer_b914fb8b50ebbc3e: function (index) {
            return addToStack(get(index).buffer);
          },
          __wbg_newwithbyteoffsetandlength_0de9ee56e9f6ee6e: function (index, val, val2) {
            return addToStack(new Uint8Array(get(index), val >>> 0, val2 >>> 0));
          },
          __wbg_new_b1f2d6842d615181: function (index) {
            return addToStack(new Uint8Array(get(index)));
          },
          __wbg_buffer_67e624f5a0ab2319: function (index) {
            return addToStack(get(index).buffer);
          },
          __wbg_length_21c4b0ae73cba59d: function (index) {
            return get(index).length;
          },
          __wbg_set_7d988c98e6ced92d: function (index, index2, val) {
            get(index).set(get(index2), val >>> 0);
          },
          __wbindgen_debug_string: function () {},
          __wbindgen_throw: function (index, offset) {
            throw new Error(decodeSub(index, offset));
          },
          __wbindgen_memory: function () {
            return addToStack(wasm.memory);
          },
          __wbindgen_closure_wrapper93: function (Qn, QT) {
            return addToStack(args(Qn, QT, 2, export3));
          },
          __wbindgen_closure_wrapper95: function (Qn, QT) {
            return addToStack(args(Qn, QT, 2, export4));
          },
          __wbindgen_closure_wrapper97: function (Qn, QT) {
            var test = addToStack(args(Qn, QT, 2, export4));
            return test;
          },
          __wbindgen_closure_wrapper99: function (Qn, QT) {
            return addToStack(args(Qn, QT, 2, export5));
          },
          __wbindgen_closure_wrapper101: function (Qn, QT) {
            return;
          },
        },
      };
      return wasmObj;
    }
    function assignWasm(resp) {
      wasm = resp.exports;
      (arr32 = null), (memoryBuff = null), wasm;
    }
    function QZ(QP) {
      var Qn;
      return void 0 !== wasm
        ? wasm
        : ((Qn = initWasm()),
          QP instanceof WebAssembly.Module || (QP = new WebAssembly.Module(QP)),
          assignWasm(new WebAssembly.Instance(QP, Qn)));
    }
    // todo!
    function loadWasm(url) {
      return __awaiter(this, void 0, void 0, function () {
        var mod, buffer, _a, _b;
        var _c;
        return __generator(this, function (_d) {
          switch (_d.label) {
            case 0:
              if (!(void 0 !== wasm)) return [3 /*break*/, 1];
              _a = wasm;
              return [3 /*break*/, 4];
            case 1:
              mod = initWasm();
              (url = fetch(url)), void 0;
              _b = QN;
              return [4 /*yield*/, url];
            case 2:
              return [4 /*yield*/, _b.apply(void 0, [_d.sent(), mod])];
            case 3:
              _a =
                ((_c = _d.sent()),
                (url = _c.instance),
                (mod = _c.module),
                (buffer = _c.bytes),
                assignWasm(url),
                buffer);
              _d.label = 4;
            case 4:
              return [2 /*return*/, _a];
          }
        });
      });
    }
    var greetLoader = {
      greet: function () {
        wasm.greet();
      },
    };
    var wasmLoader = Object.assign(loadWasm, { initSync: QZ }, greetLoader);
    var Z = function (z, Q0) {
      try {
        var Q1 = CryptoJS.AES.decrypt(z, Q0);
        return JSON.parse(Q1.toString(CryptoJS.enc.Utf8));
      } catch (Q2) {}
      return [];
    };
    var R = function (z, Q0) {
      try {
        for (var Q1 = 0; Q1 < z.length; Q1++) {
          z[Q1] = z[Q1] ^ Q0[Q1 % Q0.length];
        }
      } catch (Q2) {
        return null;
      }
    };
    function r(z) {
      return [(4278190080 & z) >> 24, (16711680 & z) >> 16, (65280 & z) >> 8, 255 & z];
    }
    const V = async () => {
      let Q0 = await wasmLoader(loading_url);
      try {
        wasmLoader.greet();
      } catch (error) {
        console.error('error: ', error);
      }
      try {
        fake_window.jwt_plugin(Q0);
        let test = new Uint8Array(fake_window.clipboard());
        return test;
      } catch (e) {
        return '';
      }
    };

    const getMeta = async url => {
      let resp = await fetch(url, {
        headers: {
          UserAgent: user_agent,
          Referrer: referrer,
        },
      });
      let txt = await resp.text();
      let regex = /name="fyq" content="[A-Za-z0-9]*/g;
      let match = txt.match(regex)[0];
      let content = match.slice(match.lastIndexOf('"') + 1);
      meta.content = content;
    };

    async function stream(xrax) {
      await getMeta(embed_url + xrax + '?z=');
      fake_window.xrax = xrax;
      let keys = await V();
      if (keys == '') throw 'NO_STREAM';
      let getSourcesUrl =
        get_sources_url +
        xrax +
        '&v=' +
        fake_window.localStorage.kversion +
        '&h=' +
        fake_window.localStorage.kid +
        '&b=1676800512';
      let resp_json = await (
        await fetch(getSourcesUrl, {
          headers: {
            'User-Agent': user_agent,
            'X-Requested-With': 'XMLHttpRequest',
          },
          method: 'GET',
          mode: 'cors',
        })
      ).json();

      let encrypted = resp_json.sources;
      var Q3 = fake_window.localStorage.kversion;
      let tostr = '';
      tostr += Q3;
      var Q1 = r(parseInt(tostr));
      let Q8 = (R(keys, Q1), keys) as any;

      let num = [];

      Q8.forEach(e => {
        num.push(e);
      });

      let str = btoa(String.fromCharCode.apply(null, num));
      var real = Z(encrypted, str);

      const source = real?.[0]?.file;
      return { source, subtitles: resp_json.tracks || [] };
    }

    return stream(xrax);
  } catch (e) {
    throw 'NO_STREAM';
  }
}

export default { stream };
