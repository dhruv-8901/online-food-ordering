var _0x4b28 = [
  "#theme_layout",
  "#sidebar_style",
  "#header_position",
  "#theme_direction",
  "change",
  "body",
  "attr",
  "value",
  "data-sidebar-position",
  "data-header-position",
  "html",
  "dir",
  "addClass",
  "direction",
  "data-sidebar-style",
  "full",
  "data-layout",
  "boxed",
  "vertical",
  "overlay",
  "data-container",
  "Sorry!\x20Overlay\x20is\x20not\x20possible\x20in\x20Horizontal\x20layout.",
  "Sorry!\x20Full\x20menu\x20is\x20not\x20available\x20in\x20Vertical\x20Boxed\x20layout.",
  "click",
  "data-nav-headerbg",
  "input[name=\x22header_bg\x22]",
  "data-headerbg",
  "input[name=\x22sidebar_bg\x22]",
  "data-sibebarbg",
  "#theme_version",
];
(function (_0x4bada6, _0x282749) {
  var _0x43b299 = function (_0x404a00) {
    while (--_0x404a00) {
      _0x4bada6["push"](_0x4bada6["shift"]());
    }
  };
  _0x43b299(++_0x282749);
})(_0x4b28, 0xb3);
var _0x5c2a = function (_0x46f5cb, _0x2cfd5b) {
  _0x46f5cb = _0x46f5cb - 0x0;
  var _0x1bc655 = _0x4b28[_0x46f5cb];
  return _0x1bc655;
};
(function (_0x1666ed) {
  "use strict";
  const _0x6bbfac = _0x1666ed(_0x5c2a("0x0"));
  const _0x23de15 = _0x1666ed(_0x5c2a("0x1"));
  const _0x256cdc = _0x1666ed(_0x5c2a("0x2"));
  const _0x2a4599 = _0x1666ed("#sidebar_position");
  const _0x1625d4 = _0x1666ed(_0x5c2a("0x3"));
  const _0x55e3a9 = _0x1666ed("#container_layout");
  const _0x2372bb = _0x1666ed(_0x5c2a("0x4"));
  _0x6bbfac["on"](_0x5c2a("0x5"), function () {
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      "data-theme-version",
      this[_0x5c2a("0x8")]
    );
  });
  _0x2a4599["on"]("change", function () {
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      _0x5c2a("0x9"),
      this[_0x5c2a("0x8")]
    );
  });
  _0x1625d4["on"](_0x5c2a("0x5"), function () {
    _0x1666ed("body")[_0x5c2a("0x7")](_0x5c2a("0xa"), this["value"]);
  });
  _0x2372bb["on"](_0x5c2a("0x5"), function () {
    _0x1666ed(_0x5c2a("0xb"))[_0x5c2a("0x7")](_0x5c2a("0xc"), this["value"]);
    _0x1666ed(_0x5c2a("0xb"))[_0x5c2a("0x7")]("class", "");
    _0x1666ed(_0x5c2a("0xb"))[_0x5c2a("0xd")](this[_0x5c2a("0x8")]);
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      _0x5c2a("0xe"),
      this[_0x5c2a("0x8")]
    );
  });
  _0x23de15["on"](_0x5c2a("0x5"), function () {
    if (
      _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](_0x5c2a("0xf")) === "overlay"
    ) {
      _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
        "data-sidebar-style",
        _0x5c2a("0x10")
      );
      _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
        "data-layout",
        this[_0x5c2a("0x8")]
      );
      return;
    }
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      _0x5c2a("0x11"),
      this[_0x5c2a("0x8")]
    );
  });
  _0x55e3a9["on"](_0x5c2a("0x5"), function () {
    if (this[_0x5c2a("0x8")] === _0x5c2a("0x12")) {
      if (
        _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](_0x5c2a("0x11")) ===
          _0x5c2a("0x13") &&
        _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")]("data-sidebar-style") ===
          _0x5c2a("0x10")
      ) {
        _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
          _0x5c2a("0xf"),
          _0x5c2a("0x14")
        );
        _0x1666ed(_0x5c2a("0x6"))["attr"](_0x5c2a("0x15"), this["value"]);
        return;
      }
    }
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      _0x5c2a("0x15"),
      this[_0x5c2a("0x8")]
    );
  });
  _0x256cdc["on"](_0x5c2a("0x5"), function () {
    if (
      _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](_0x5c2a("0x11")) ===
      "horizontal"
    ) {
      if (this[_0x5c2a("0x8")] === _0x5c2a("0x14")) {
        alert(_0x5c2a("0x16"));
        return;
      }
    }
    if (
      _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](_0x5c2a("0x11")) === "vertical"
    ) {
      if (
        _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](_0x5c2a("0x15")) ===
          _0x5c2a("0x12") &&
        this[_0x5c2a("0x8")] === _0x5c2a("0x10")
      ) {
        alert(_0x5c2a("0x17"));
        return;
      }
    }
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      "data-sidebar-style",
      this[_0x5c2a("0x8")]
    );
  });
  _0x1666ed("input[name=\x22navigation_header\x22]")["on"](
    _0x5c2a("0x18"),
    function () {
      _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
        _0x5c2a("0x19"),
        this[_0x5c2a("0x8")]
      );
    }
  );
  _0x1666ed(_0x5c2a("0x1a"))["on"](_0x5c2a("0x18"), function () {
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      _0x5c2a("0x1b"),
      this[_0x5c2a("0x8")]
    );
  });
  _0x1666ed(_0x5c2a("0x1c"))["on"](_0x5c2a("0x18"), function () {
    _0x1666ed(_0x5c2a("0x6"))[_0x5c2a("0x7")](
      _0x5c2a("0x1d"),
      this[_0x5c2a("0x8")]
    );
  });
})(jQuery);
