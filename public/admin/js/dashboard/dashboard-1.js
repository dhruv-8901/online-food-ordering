var _0x2f80 = [
  "which",
  "val",
  "replace",
  ".tdl-content\x20ul",
  "append",
  "<li><label><input\x20type=\x27checkbox\x27><i></i><span>",
  "parent",
  "addClass",
  "delay",
  "fast",
  "remove",
  "click",
  "stop",
  "slideUp",
  "Line",
  "#home_chart_widget_1",
  "#home_chart_widget_3",
  "#home_chart_widget_4",
  "#todo_list",
  "slimscroll",
  "right",
  "2px",
  "413px",
  "#ticket",
  "495px",
  ".multi-steps",
  "find",
  "removeClass",
  "is-active",
  "world",
  "getElementById",
  "world-datamap",
  "transparent",
  "rgba(0,123,255,0.5)",
  "<div\x20class=\x22datamap-sales-hover-tooltip\x22>",
  "<span\x20class=\x22m-l-5\x22></span>\x20",
  "sold",
  "rgb(255,\x20255,\x20255)",
  "#f5f5f5",
  "rgba(0,123,255,1)",
  "#EBEFF2",
  "#727cf5",
  "#0acf97",
  "#39afd1",
  "#ffbc00",
  "#fa5c7c",
  "bubbles",
  "secondary",
  "$500",
  "United\x20States",
  "success",
  "$900",
  "Saudia\x20Arabia",
  "RUS",
  "$250",
  "Russia",
  "CAN",
  "Canada",
  "AUS",
  "danger",
  "$700",
  "Australia",
  "BGD",
  "info",
  "$1500",
  "Bangladesh",
  "addEventListener",
  "resize",
  "user_rating_graph",
  "getContext",
  "Roboto",
  "rgba(",
  ",\x201)",
  "Food",
  "Service",
  "Waiting\x20Time",
  "Others",
  "10:00",
  "11:00",
  "12:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "My\x20First\x20dataset",
  "earnings_bar_chart",
  "Poppins",
  "Jan",
  "Mar",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Expense",
  ",\x20.75)",
  "Earning",
  "#F1F3F7",
  "bar",
  "index",
  "#top_menu_carousel",
  ".tdl-new",
];
(function (_0x432349, _0xbacc4e) {
  var _0x3e30de = function (_0x5bbf3e) {
    while (--_0x5bbf3e) {
      _0x432349["push"](_0x432349["shift"]());
    }
  };
  _0x3e30de(++_0xbacc4e);
})(_0x2f80, 0xf1);
var _0x3c67 = function (_0x5e8ab6, _0x37f612) {
  _0x5e8ab6 = _0x5e8ab6 - 0x0;
  var _0x24b585 = _0x2f80[_0x5e8ab6];
  return _0x24b585;
};
(function (_0x4f7df7) {
  "use strict";
  const _0x10daa2 = new Datamap({
    scope: _0x3c67("0x0"),
    element: document[_0x3c67("0x1")](_0x3c67("0x2")),
    responsive: !0x0,
    geographyConfig: {
      popupOnHover: !0x1,
      highlightOnHover: !0x1,
      borderColor: _0x3c67("0x3"),
      borderRadius: 0x0,
      highlightBorderWidth: 0x3,
      highlightFillColor: _0x3c67("0x4"),
      highlightBorderColor: "rgba(255,255,255,0.1)",
      borderWidth: 0x1,
    },
    bubblesConfig: {
      popupTemplate: function (_0x4f7df7, _0x5b74e2) {
        return (
          _0x3c67("0x5") +
          _0x5b74e2["country"] +
          _0x3c67("0x6") +
          _0x5b74e2[_0x3c67("0x7")] +
          "</div>"
        );
      },
      borderWidth: 0x0,
      highlightBorderWidth: 0x0,
      highlightFillColor: _0x3c67("0x8"),
      highlightBorderColor: _0x3c67("0x8"),
      fillOpacity: 0.75,
    },
    fills: {
      Visited: _0x3c67("0x9"),
      neato: _0x3c67("0xa"),
      white: _0x3c67("0x8"),
      defaultFill: _0x3c67("0xb"),
      primary: _0x3c67("0xc"),
      secondary: "#6c757d",
      success: _0x3c67("0xd"),
      info: _0x3c67("0xe"),
      warning: _0x3c67("0xf"),
      danger: _0x3c67("0x10"),
    },
  });
  _0x10daa2[_0x3c67("0x11")]([
    {
      centered: "USA",
      fillKey: _0x3c67("0x12"),
      radius: 0x5,
      sold: _0x3c67("0x13"),
      country: _0x3c67("0x14"),
    },
    {
      centered: "SAU",
      fillKey: _0x3c67("0x15"),
      radius: 0x5,
      sold: _0x3c67("0x16"),
      country: _0x3c67("0x17"),
    },
    {
      centered: _0x3c67("0x18"),
      fillKey: "warning",
      radius: 0x5,
      sold: _0x3c67("0x19"),
      country: _0x3c67("0x1a"),
    },
    {
      centered: _0x3c67("0x1b"),
      fillKey: "primary",
      radius: 0x5,
      sold: "$999",
      country: _0x3c67("0x1c"),
    },
    {
      centered: _0x3c67("0x1d"),
      fillKey: _0x3c67("0x1e"),
      radius: 0x5,
      sold: _0x3c67("0x1f"),
      country: _0x3c67("0x20"),
    },
    {
      centered: _0x3c67("0x21"),
      fillKey: _0x3c67("0x22"),
      radius: 0x5,
      sold: _0x3c67("0x23"),
      country: _0x3c67("0x24"),
    },
  ]),
    window[_0x3c67("0x25")](_0x3c67("0x26"), function (_0x4f7df7) {
      _0x10daa2[_0x3c67("0x26")]();
    });
  const _0x5324b3 = document[_0x3c67("0x1")](_0x3c67("0x27"))[_0x3c67("0x28")](
    "2d"
  );
  new Chart(_0x5324b3, {
    type: "doughnut",
    data: {
      defaultFontFamily: _0x3c67("0x29"),
      datasets: [
        {
          data: [0xdc, 0x1a4, 0x104, 0x1cc],
          borderWidth: 0x0,
          backgroundColor: [
            _0x3c67("0x2a") + PRIMARY + _0x3c67("0x2b"),
            "rgba(" + INFO + _0x3c67("0x2b"),
            _0x3c67("0x2a") + SUCCESS + _0x3c67("0x2b"),
            _0x3c67("0x2a") + DARK + _0x3c67("0x2b"),
          ],
          hoverBackgroundColor: [
            _0x3c67("0x2a") + PRIMARY + ",\x201)",
            _0x3c67("0x2a") + INFO + _0x3c67("0x2b"),
            _0x3c67("0x2a") + SUCCESS + _0x3c67("0x2b"),
            _0x3c67("0x2a") + DARK + _0x3c67("0x2b"),
          ],
        },
      ],
      labels: [
        _0x3c67("0x2c"),
        _0x3c67("0x2d"),
        _0x3c67("0x2e"),
        _0x3c67("0x2f"),
      ],
    },
    options: {
      responsive: !![],
      maintainAspectRatio: ![],
      legend: { display: ![] },
    },
  });
  const _0x55be29 =
    document["getElementById"]("visitor_graph")[_0x3c67("0x28")]("2d");
  new Chart(_0x55be29, {
    type: "line",
    data: {
      defaultFontFamily: _0x3c67("0x29"),
      labels: [
        _0x3c67("0x30"),
        _0x3c67("0x31"),
        _0x3c67("0x32"),
        _0x3c67("0x33"),
        _0x3c67("0x34"),
        _0x3c67("0x35"),
        _0x3c67("0x36"),
        _0x3c67("0x37"),
        _0x3c67("0x38"),
        _0x3c67("0x39"),
        "08:00",
      ],
      datasets: [
        {
          label: _0x3c67("0x3a"),
          data: [
            0x19, 0x14, 0x3c, 0x29, 0x42, 0x2d, 0x50, 0x4c, 0x59, 0x41, 0x37,
          ],
          borderColor: "rgba(" + PRIMARY + _0x3c67("0x2b"),
          borderWidth: "2",
          backgroundColor: _0x3c67("0x3"),
          pointBackgroundColor: _0x3c67("0x2a") + PRIMARY + _0x3c67("0x2b"),
        },
        {
          label: "My\x20First\x20dataset",
          data: [
            0x1e, 0x19, 0x32, 0x2d, 0x4b, 0x32, 0x5a, 0x50, 0x5f, 0x4b, 0x37,
          ],
          borderColor: _0x3c67("0x2a") + SUCCESS + _0x3c67("0x2b"),
          borderWidth: "2",
          backgroundColor: _0x3c67("0x3"),
          pointBackgroundColor: _0x3c67("0x2a") + SUCCESS + ",\x201)",
        },
      ],
    },
    options: {
      legend: ![],
      maintainAspectRatio: ![],
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: !![],
              max: 0x64,
              min: 0x0,
              stepSize: 0x14,
              padding: 0x0,
              display: !![],
            },
            gridLines: { display: ![], drawBorder: ![] },
          },
        ],
        xAxes: [
          {
            ticks: { padding: 0xa },
            gridLines: { display: !![], drawBorder: ![] },
          },
        ],
      },
    },
  });
  const _0x36a6df = document[_0x3c67("0x1")](_0x3c67("0x3b"))["getContext"](
    "2d"
  );
  let _0x56a5f3 = {
    defaultFontFamily: _0x3c67("0x3c"),
    labels: [
      _0x3c67("0x3d"),
      "Feb",
      _0x3c67("0x3e"),
      "Apr",
      "May",
      "Jun",
      _0x3c67("0x3f"),
      _0x3c67("0x40"),
      _0x3c67("0x41"),
      _0x3c67("0x42"),
      _0x3c67("0x43"),
      _0x3c67("0x44"),
    ],
    datasets: [
      {
        label: _0x3c67("0x45"),
        backgroundColor: _0x3c67("0x2a") + PRIMARY + _0x3c67("0x46"),
        hoverBackgroundColor: _0x3c67("0x2a") + PRIMARY + ",\x20.75)",
        data: [
          "20",
          "14",
          "18",
          "25",
          "27",
          "22",
          "12",
          "24",
          "20",
          "14",
          "18",
          "16",
        ],
      },
      {
        label: _0x3c67("0x47"),
        backgroundColor: "#F1F3F7",
        hoverBackgroundColor: _0x3c67("0x48"),
        data: [
          "12",
          "18",
          "14",
          "7",
          "5",
          "10",
          "20",
          "8",
          "12",
          "18",
          "14",
          "16",
        ],
      },
    ],
  };
  new Chart(_0x36a6df, {
    type: _0x3c67("0x49"),
    data: _0x56a5f3,
    options: {
      legend: { display: ![] },
      title: { display: ![] },
      tooltips: { mode: _0x3c67("0x4a"), intersect: ![] },
      responsive: !![],
      maintainAspectRatio: ![],
      scales: {
        xAxes: [
          {
            stacked: !![],
            barPercentage: 0.4,
            gridLines: { display: ![], drawBorder: ![] },
          },
        ],
        yAxes: [
          { stacked: !![], gridLines: { display: ![], drawBorder: ![] } },
        ],
      },
    },
  });
  $(_0x3c67("0x4b"))["owlCarousel"]({
    margin: 0x19,
    autoplay: ![],
    rewind: !![],
    responsive: {
      1500: { items: 0x4 },
      1200: { items: 0x3 },
      992: { items: 0x3 },
      768: { items: 0x2 },
      575: { items: 0x2 },
      0: { items: 0x1 },
    },
  });
  $(_0x3c67("0x4c"))["on"]("keypress", function (_0x4f7df7) {
    var _0x4cdf85 = _0x4f7df7["keyCode"]
      ? _0x4f7df7["keyCode"]
      : _0x4f7df7[_0x3c67("0x4d")];
    if (_0x4cdf85 == 0xd) {
      var _0x26cf12 = $(this)[_0x3c67("0x4e")]();
      var _0x52942e = _0x26cf12[_0x3c67("0x4f")](/ +?/g, "");
      if (_0x52942e == "") {
        return ![];
      } else {
        $(_0x3c67("0x50"))[_0x3c67("0x51")](
          _0x3c67("0x52") +
            _0x26cf12 +
            "</span><a\x20href=\x27#\x27\x20class=\x27ti-trash\x27></a></label></li>"
        );
        $(this)[_0x3c67("0x4e")]("");
      }
    }
  });
  $(".tdl-content\x20a")["on"]("click", function () {
    var _0x1950d4 = $(this)[_0x3c67("0x53")]()[_0x3c67("0x53")]("li");
    _0x1950d4[_0x3c67("0x54")]("remove")
      ["stop"]()
      [_0x3c67("0x55")](0x64)
      ["slideUp"](_0x3c67("0x56"), function () {
        _0x1950d4[_0x3c67("0x57")]();
      });
    return ![];
  });
  $(".tdl-content")["on"](_0x3c67("0x58"), "a", function () {
    var _0x43ca54 = $(this)["parent"]()[_0x3c67("0x53")]("li");
    _0x43ca54[_0x3c67("0x54")](_0x3c67("0x57"))
      [_0x3c67("0x59")]()
      [_0x3c67("0x55")](0x64)
      [_0x3c67("0x5a")](_0x3c67("0x56"), function () {
        _0x43ca54["remove"]();
      });
    return ![];
  });
  new Chartist[_0x3c67("0x5b")](
    _0x3c67("0x5c"),
    {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      series: [[0x4, 0x5, 3.5, 0x5, 0x4, 5.5, 3.8, 4.6]],
    },
    {
      low: 0x0,
      showArea: 0x1,
      showPoint: !0x0,
      showLine: !0x0,
      fullWidth: !0x0,
      lineSmooth: !0x1,
      chartPadding: { top: 0x4, right: 0x0, bottom: 0x0, left: 0x0 },
      axisX: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
      axisY: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
    }
  );
  new Chartist[_0x3c67("0x5b")](
    "#home_chart_widget_2",
    {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      series: [[0x4, 0x5, 3.5, 0x5, 0x4, 5.5, 3.8, 4.6]],
    },
    {
      low: 0x0,
      showArea: 0x1,
      showPoint: !0x0,
      showLine: !0x0,
      fullWidth: !0x0,
      lineSmooth: !0x1,
      chartPadding: { top: 0x4, right: 0x0, bottom: 0x0, left: 0x0 },
      axisX: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
      axisY: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
    }
  );
  new Chartist[_0x3c67("0x5b")](
    _0x3c67("0x5d"),
    {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      series: [[0x4, 0x5, 3.5, 0x5, 0x4, 5.5, 3.8, 4.6]],
    },
    {
      low: 0x0,
      showArea: 0x1,
      showPoint: !0x0,
      showLine: !0x0,
      fullWidth: !0x0,
      lineSmooth: !0x1,
      chartPadding: { top: 0x4, right: 0x0, bottom: 0x0, left: 0x0 },
      axisX: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
      axisY: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
    }
  );
  new Chartist[_0x3c67("0x5b")](
    _0x3c67("0x5e"),
    {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      series: [[0x4, 0x5, 3.5, 0x5, 0x4, 5.5, 3.8, 4.6]],
    },
    {
      low: 0x0,
      showArea: 0x1,
      showPoint: !0x0,
      showLine: !0x0,
      fullWidth: !0x0,
      lineSmooth: !0x1,
      chartPadding: { top: 0x4, right: 0x0, bottom: 0x0, left: 0x0 },
      axisX: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
      axisY: { showLabel: !0x1, showGrid: !0x1, offset: 0x0 },
    }
  );
  $(_0x3c67("0x5f"))[_0x3c67("0x60")]({
    position: _0x3c67("0x61"),
    size: _0x3c67("0x62"),
    height: _0x3c67("0x63"),
    color: _0x3c67("0x3"),
  });
  $(_0x3c67("0x64"))[_0x3c67("0x60")]({
    position: _0x3c67("0x61"),
    size: "2px",
    height: _0x3c67("0x65"),
    color: "transparent",
  });
  const _0x2c1f9d = $(_0x3c67("0x66"))[_0x3c67("0x67")]("li");
  _0x2c1f9d["on"](_0x3c67("0x58"), function () {
    _0x2c1f9d[_0x3c67("0x68")](_0x3c67("0x69"));
    $(this)[_0x3c67("0x54")](_0x3c67("0x69"));
  });
})(jQuery);
