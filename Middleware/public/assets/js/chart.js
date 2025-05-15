var options = {
    series: [
        {
            name: "Earning",
            data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25],
        },
    ],
    chart: {
        type: "bar",
        height: 100,
        toolbar: {
            show: false,
        }
    },
    colors : ['#4272da'],
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
        
    },
    xaxis:{
        labels:{
            show: false,
        },
        axisBorder: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        crosshairs: {
            show: false,
        },
        axisTicks: {
            show: false,
        }
    },
    yaxis: {
        title: {
            show: false
        },
        labels:{
            show: false,
        },
        axisBorder: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        crosshairs: {
            show: false,
        }
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        enabled: false,
    },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var options = {
    series: [
        {
            name: "Earning",
            data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25],
        },
    ],
    chart: {
        type: "bar",
        height: 100,
        toolbar: {
            show: false,
        }
    },
    colors: ['#c67a25'],
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
        
    },
    xaxis:{
        labels:{
            show: false,
        },
        axisBorder: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        crosshairs: {
            show: false,
        },
        axisTicks: {
            show: false,
        }
    },
    yaxis: {
        title: {
            show: false
        },
        labels:{
            show: false,
        },
        axisBorder: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        crosshairs: {
            show: false,
        }
    },
    fill: {
        opacity: 1,
    },
    title: {
        show: false,
    },
    tooltip: {
        enabled: true,
        style: {
            fontSize: '12px',
            fontFamily: 'Inter',
            colors: '#2E93fA',
          },
    },
};

var chart = new ApexCharts(document.querySelector("#chart1"), options);
chart.render();

var options = {
    series: [
        {
            name: "series1",
            data: [30, 60, 40, 70, 50, 90, 50, 55, 45, 60, 50, 65],
        },
    ],
    chart: {
        height: 300,
        type: "area",
        toolbar: {
            show: false,
        }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
        width: 1,
    },
    fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
    grid: {
        show: false,
    },
    xaxis: {
        categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: true,
            style: {
                colors: ['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'],
                fontSize: '10px',
                fontFamily: 'inter',
                fontWeight: 500,
            },
        }
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                colors: ['#ffffff'],
                fontSize: '10px',
                fontFamily: 'inter',
                fontWeight: 500,
            },
        }
    },
    tooltip: {
        enabled: false,
    },
};

var chart = new ApexCharts(document.querySelector("#customerRate"), options);
chart.render();


