var _0x1925 = [
  "input[name=\x27category-name\x27]",
  "<div\x20class=\x22external-event\x20bg-",
  "\x22\x20data-class=\x22bg-",
  "\x22\x20style=\x22position:\x20relative;\x22><i\x20class=\x22fa\x20fa-move\x22></i>",
  "</div>",
  "enableDrag",
  "CalendarApp",
  "Constructor",
  "jQuery",
  "body",
  "$modal",
  "#event-modal",
  "#external-events\x20div.external-event",
  "#calendar",
  "$saveCategoryBtn",
  ".save-category",
  "$categoryForm",
  "#add-category\x20form",
  "$extEvents",
  "prototype",
  "data",
  "attr",
  "data-class",
  "extend",
  "start",
  "className",
  "fullCalendar",
  "renderEvent",
  "#drop-remove",
  ":checked",
  "<form></form>",
  "<label>Change\x20event\x20name</label>",
  "append",
  "<div\x20class=\x27input-group\x27><input\x20class=\x27form-control\x27\x20type=text\x20value=\x27",
  "title",
  "\x27\x20/><span\x20class=\x27input-group-btn\x27><button\x20type=\x27submit\x27\x20class=\x27btn\x20btn-success\x20waves-effect\x20waves-light\x27><i\x20class=\x27fa\x20fa-check\x27></i>\x20Save</button></span></div>",
  "static",
  "find",
  ".delete-event",
  "end",
  ".save-event",
  ".modal-body",
  "empty",
  "prepend",
  "unbind",
  "click",
  "$calendarObj",
  "removeEvents",
  "_id",
  "form",
  "submit",
  "val",
  "updateEvent",
  "hide",
  "<div\x20class=\x27row\x27></div>",
  ".row",
  "<div\x20class=\x27col-md-6\x27><div\x20class=\x27form-group\x27><label\x20class=\x27control-label\x27>Category</label><select\x20class=\x27form-control\x27\x20name=\x27category\x27></select></div></div>",
  "select[name=\x27category\x27]",
  "<option\x20value=\x27bg-danger\x27>Danger</option>",
  "<option\x20value=\x27bg-success\x27>Success</option>",
  "<option\x20value=\x27bg-dark\x27>Dark</option>",
  "<option\x20value=\x27bg-primary\x27>Primary</option>",
  "<option\x20value=\x27bg-pink\x27>Pink</option>",
  "<option\x20value=\x27bg-info\x27>Info</option>",
  "<option\x20value=\x27bg-warning\x27>Warning</option></div></div>",
  "show",
  "input[name=\x27title\x27]",
  "input[name=\x27beginning\x27]",
  "input[name=\x27ending\x27]",
  "select[name=\x27category\x27]\x20option:checked",
  "You\x20have\x20to\x20give\x20a\x20title\x20to\x20your\x20event",
  "$event",
  "each",
  "trim",
  "eventObject",
  "init",
  "getMonth",
  "getFullYear",
  "Chicken\x20Burger",
  "now",
  "bg-dark",
  "Hot\x20dog",
  "bg-primary",
  "$calendar",
  "19:00:00",
  "month",
  "height",
  "prev,next\x20today",
  "month,agendaWeek,agendaDay",
  "onEventClick",
];
(function (_0x560e65, _0x2d6183) {
  var _0x102a3c = function (_0x365d3e) {
    while (--_0x365d3e) {
      _0x560e65["push"](_0x560e65["shift"]());
    }
  };
  _0x102a3c(++_0x2d6183);
})(_0x1925, 0x117);
var _0x29b5 = function (_0x329aa9, _0x14d486) {
  _0x329aa9 = _0x329aa9 - 0x0;
  var _0x4f84d9 = _0x1925[_0x329aa9];
  return _0x4f84d9;
};
!(function (_0x33284f) {
  "use strict";
  var _0x34936f = function () {
    (this["$body"] = _0x33284f(_0x29b5("0x0"))),
      (this[_0x29b5("0x1")] = _0x33284f(_0x29b5("0x2"))),
      (this["$event"] = _0x29b5("0x3")),
      (this["$calendar"] = _0x33284f(_0x29b5("0x4"))),
      (this[_0x29b5("0x5")] = _0x33284f(_0x29b5("0x6"))),
      (this[_0x29b5("0x7")] = _0x33284f(_0x29b5("0x8"))),
      (this[_0x29b5("0x9")] = _0x33284f("#external-events")),
      (this["$calendarObj"] = null);
  };
  (_0x34936f[_0x29b5("0xa")]["onDrop"] = function (_0x34936f, _0x430f9f) {
    var _0x476872 = _0x34936f[_0x29b5("0xb")]("eventObject"),
      _0x4421ed = _0x34936f[_0x29b5("0xc")](_0x29b5("0xd")),
      _0x59b428 = _0x33284f[_0x29b5("0xe")]({}, _0x476872);
    (_0x59b428[_0x29b5("0xf")] = _0x430f9f),
      _0x4421ed && (_0x59b428[_0x29b5("0x10")] = [_0x4421ed]),
      this["$calendar"][_0x29b5("0x11")](_0x29b5("0x12"), _0x59b428, !0x0),
      _0x33284f(_0x29b5("0x13"))["is"](_0x29b5("0x14")) &&
        _0x34936f["remove"]();
  }),
    (_0x34936f[_0x29b5("0xa")]["onEventClick"] = function (
      _0x34936f,
      _0x4ea364,
      _0x4602e5
    ) {
      var _0x544c84 = this,
        _0x47744e = _0x33284f(_0x29b5("0x15"));
      _0x47744e["append"](_0x29b5("0x16")),
        _0x47744e[_0x29b5("0x17")](
          _0x29b5("0x18") + _0x34936f[_0x29b5("0x19")] + _0x29b5("0x1a")
        ),
        _0x544c84["$modal"]["modal"]({ backdrop: _0x29b5("0x1b") }),
        _0x544c84["$modal"]
          [_0x29b5("0x1c")](_0x29b5("0x1d"))
          ["show"]()
          [_0x29b5("0x1e")]()
          [_0x29b5("0x1c")](_0x29b5("0x1f"))
          ["hide"]()
          [_0x29b5("0x1e")]()
          [_0x29b5("0x1c")](_0x29b5("0x20"))
          [_0x29b5("0x21")]()
          [_0x29b5("0x22")](_0x47744e)
          [_0x29b5("0x1e")]()
          [_0x29b5("0x1c")](".delete-event")
          [_0x29b5("0x23")](_0x29b5("0x24"))
          ["on"](_0x29b5("0x24"), function () {
            _0x544c84[_0x29b5("0x25")][_0x29b5("0x11")](
              _0x29b5("0x26"),
              function (_0x33284f) {
                return _0x33284f[_0x29b5("0x27")] == _0x34936f["_id"];
              }
            ),
              _0x544c84[_0x29b5("0x1")]["modal"]("hide");
          }),
        _0x544c84[_0x29b5("0x1")]
          ["find"](_0x29b5("0x28"))
          ["on"](_0x29b5("0x29"), function () {
            return (
              (_0x34936f[_0x29b5("0x19")] =
                _0x47744e[_0x29b5("0x1c")]("input[type=text]")[
                  _0x29b5("0x2a")
                ]()),
              _0x544c84[_0x29b5("0x25")][_0x29b5("0x11")](
                _0x29b5("0x2b"),
                _0x34936f
              ),
              _0x544c84["$modal"]["modal"](_0x29b5("0x2c")),
              !0x1
            );
          });
    }),
    (_0x34936f[_0x29b5("0xa")]["onSelect"] = function (
      _0x34936f,
      _0x259e1a,
      _0x5329c8
    ) {
      var _0x3f4bee = this;
      _0x3f4bee[_0x29b5("0x1")]["modal"]({ backdrop: _0x29b5("0x1b") });
      var _0x40d9fb = _0x33284f(_0x29b5("0x15"));
      _0x40d9fb[_0x29b5("0x17")](_0x29b5("0x2d")),
        _0x40d9fb[_0x29b5("0x1c")](_0x29b5("0x2e"))
          ["append"](
            "<div\x20class=\x27col-md-6\x27><div\x20class=\x27form-group\x27><label\x20class=\x27control-label\x27>Event\x20Name</label><input\x20class=\x27form-control\x27\x20placeholder=\x27Insert\x20Event\x20Name\x27\x20type=\x27text\x27\x20name=\x27title\x27/></div></div>"
          )
          [_0x29b5("0x17")](_0x29b5("0x2f"))
          ["find"](_0x29b5("0x30"))
          [_0x29b5("0x17")](_0x29b5("0x31"))
          ["append"](_0x29b5("0x32"))
          ["append"](_0x29b5("0x33"))
          [_0x29b5("0x17")](_0x29b5("0x34"))
          [_0x29b5("0x17")](_0x29b5("0x35"))
          ["append"](_0x29b5("0x36"))
          [_0x29b5("0x17")](_0x29b5("0x37")),
        _0x3f4bee[_0x29b5("0x1")]
          [_0x29b5("0x1c")](_0x29b5("0x1d"))
          [_0x29b5("0x2c")]()
          [_0x29b5("0x1e")]()
          [_0x29b5("0x1c")](_0x29b5("0x1f"))
          [_0x29b5("0x38")]()
          [_0x29b5("0x1e")]()
          [_0x29b5("0x1c")](".modal-body")
          [_0x29b5("0x21")]()
          [_0x29b5("0x22")](_0x40d9fb)
          [_0x29b5("0x1e")]()
          [_0x29b5("0x1c")](".save-event")
          [_0x29b5("0x23")]("click")
          ["on"](_0x29b5("0x24"), function () {
            _0x40d9fb[_0x29b5("0x29")]();
          }),
        _0x3f4bee[_0x29b5("0x1")]
          [_0x29b5("0x1c")](_0x29b5("0x28"))
          ["on"](_0x29b5("0x29"), function () {
            var _0x33284f = _0x40d9fb[_0x29b5("0x1c")](_0x29b5("0x39"))[
                "val"
              ](),
              _0x5329c8 =
                (_0x40d9fb[_0x29b5("0x1c")](_0x29b5("0x3a"))[_0x29b5("0x2a")](),
                _0x40d9fb[_0x29b5("0x1c")](_0x29b5("0x3b"))[_0x29b5("0x2a")](),
                _0x40d9fb["find"](_0x29b5("0x3c"))[_0x29b5("0x2a")]());
            return (
              null !== _0x33284f && 0x0 != _0x33284f["length"]
                ? (_0x3f4bee[_0x29b5("0x25")][_0x29b5("0x11")](
                    "renderEvent",
                    {
                      title: _0x33284f,
                      start: _0x34936f,
                      end: _0x259e1a,
                      allDay: !0x1,
                      className: _0x5329c8,
                    },
                    !0x0
                  ),
                  _0x3f4bee[_0x29b5("0x1")]["modal"](_0x29b5("0x2c")))
                : alert(_0x29b5("0x3d")),
              !0x1
            );
          }),
        _0x3f4bee[_0x29b5("0x25")][_0x29b5("0x11")]("unselect");
    }),
    (_0x34936f[_0x29b5("0xa")]["enableDrag"] = function () {
      _0x33284f(this[_0x29b5("0x3e")])[_0x29b5("0x3f")](function () {
        var _0x34936f = {
          title: _0x33284f[_0x29b5("0x40")](_0x33284f(this)["text"]()),
        };
        _0x33284f(this)[_0x29b5("0xb")](_0x29b5("0x41"), _0x34936f),
          _0x33284f(this)["draggable"]({
            zIndex: 0x3e7,
            revert: !0x0,
            revertDuration: 0x0,
          });
      });
    }),
    (_0x34936f[_0x29b5("0xa")][_0x29b5("0x42")] = function () {
      this["enableDrag"]();
      var _0x34936f = new Date(),
        _0x47c332 =
          (_0x34936f["getDate"](),
          _0x34936f[_0x29b5("0x43")](),
          _0x34936f[_0x29b5("0x44")](),
          new Date(_0x33284f["now"]())),
        _0x37a210 = [
          {
            title: _0x29b5("0x45"),
            start: new Date(_0x33284f[_0x29b5("0x46")]() + 0x96ae380),
            className: _0x29b5("0x47"),
          },
          {
            title: "Soft\x20drinks",
            start: _0x47c332,
            end: _0x47c332,
            className: "bg-danger",
          },
          {
            title: _0x29b5("0x48"),
            start: new Date(_0x33284f["now"]() + 0x14257880),
            className: _0x29b5("0x49"),
          },
        ],
        _0x130309 = this;
      (_0x130309["$calendarObj"] = _0x130309[_0x29b5("0x4a")][_0x29b5("0x11")]({
        slotDuration: "00:15:00",
        minTime: "08:00:00",
        maxTime: _0x29b5("0x4b"),
        defaultView: _0x29b5("0x4c"),
        handleWindowResize: !0x0,
        height: _0x33284f(window)[_0x29b5("0x4d")]() - 0xc8,
        header: {
          left: _0x29b5("0x4e"),
          center: _0x29b5("0x19"),
          right: _0x29b5("0x4f"),
        },
        events: _0x37a210,
        editable: !0x0,
        droppable: !0x0,
        eventLimit: !0x0,
        selectable: !0x0,
        drop: function (_0x34936f) {
          _0x130309["onDrop"](_0x33284f(this), _0x34936f);
        },
        select: function (_0x33284f, _0x34936f, _0x47c332) {
          _0x130309["onSelect"](_0x33284f, _0x34936f, _0x47c332);
        },
        eventClick: function (_0x33284f, _0x34936f, _0x47c332) {
          _0x130309[_0x29b5("0x50")](_0x33284f, _0x34936f, _0x47c332);
        },
      })),
        this[_0x29b5("0x5")]["on"]("click", function () {
          var _0x33284f = _0x130309["$categoryForm"]
              [_0x29b5("0x1c")](_0x29b5("0x51"))
              [_0x29b5("0x2a")](),
            _0x34936f = _0x130309["$categoryForm"]
              [_0x29b5("0x1c")]("select[name=\x27category-color\x27]")
              ["val"]();
          null !== _0x33284f &&
            0x0 != _0x33284f["length"] &&
            (_0x130309[_0x29b5("0x9")][_0x29b5("0x17")](
              _0x29b5("0x52") +
                _0x34936f +
                _0x29b5("0x53") +
                _0x34936f +
                _0x29b5("0x54") +
                _0x33284f +
                _0x29b5("0x55")
            ),
            _0x130309[_0x29b5("0x56")]());
        });
    }),
    (_0x33284f[_0x29b5("0x57")] = new _0x34936f()),
    (_0x33284f[_0x29b5("0x57")][_0x29b5("0x58")] = _0x34936f);
})(window[_0x29b5("0x59")]),
  (function (_0x56c5c1) {
    "use strict";
    _0x56c5c1[_0x29b5("0x57")]["init"]();
  })(window["jQuery"]);
