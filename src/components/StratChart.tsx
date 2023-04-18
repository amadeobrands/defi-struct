/* ~~/src/components/StratChart.tsx */

// imports
import { useEffect, useRef } from 'react'
import * as LightweightCharts from 'lightweight-charts'

export default function StartChart() {
  const chartContainerRef = useRef(null)

  useEffect(() => {
    // @ts-ignore
    const chart = LightweightCharts.createChart(chartContainerRef.current, {
      rightPriceScale: {
        visible: true,
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      leftPriceScale: {
        visible: true,
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      layout: {
        background: {
          type: LightweightCharts.ColorType.Solid,
          color: 'rgba(255, 255, 255, .8)',
        },
        textColor: '#0E1531',
      },
      grid: {
        horzLines: {
          color: '#0E1531',
        },
        vertLines: {
          color: '#0E1531',
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 1)',
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    })
    chart
      .addLineSeries({
        color: '#0E1531',
        lineWidth: 2,
      })
      .setData([
        { time: { year: 2018, month: 9, day: 22 }, value: 25.531816900940186 },
        { time: { year: 2018, month: 9, day: 23 }, value: 26.350850429478125 },
        { time: { year: 2018, month: 9, day: 24 }, value: 25.05218443850655 },
        { time: { year: 2018, month: 9, day: 25 }, value: 25.41022485894306 },
        { time: { year: 2018, month: 9, day: 26 }, value: 25.134847363259958 },
        { time: { year: 2018, month: 9, day: 27 }, value: 24.239250761300525 },
        { time: { year: 2018, month: 9, day: 28 }, value: 28.8673009313941 },
        { time: { year: 2018, month: 9, day: 29 }, value: 27.028082380884264 },
        { time: { year: 2018, month: 9, day: 30 }, value: 27.181577793470662 },
        { time: { year: 2018, month: 10, day: 1 }, value: 28.658957209998505 },
        { time: { year: 2018, month: 10, day: 2 }, value: 30.418392247817536 },
        { time: { year: 2018, month: 10, day: 3 }, value: 26.41825183552505 },
        { time: { year: 2018, month: 10, day: 4 }, value: 30.0951233353539 },
        { time: { year: 2018, month: 10, day: 5 }, value: 30.30985059775389 },
        { time: { year: 2018, month: 10, day: 6 }, value: 30.71612555943148 },
        { time: { year: 2018, month: 10, day: 7 }, value: 28.222424591003268 },
        { time: { year: 2018, month: 10, day: 8 }, value: 31.01149570947896 },
        { time: { year: 2018, month: 10, day: 9 }, value: 30.390225881550307 },
        { time: { year: 2018, month: 10, day: 10 }, value: 29.451733557312163 },
        { time: { year: 2018, month: 10, day: 11 }, value: 34.14376900459634 },
        { time: { year: 2018, month: 10, day: 12 }, value: 30.223333215683407 },
        { time: { year: 2018, month: 10, day: 13 }, value: 35.1548736041708 },
        { time: { year: 2018, month: 10, day: 14 }, value: 37.795223779011096 },
        { time: { year: 2018, month: 10, day: 15 }, value: 38.95966228546306 },
        { time: { year: 2018, month: 10, day: 16 }, value: 35.59132526195566 },
        { time: { year: 2018, month: 10, day: 17 }, value: 38.42249768195307 },
        { time: { year: 2018, month: 10, day: 18 }, value: 40.82520015585623 },
        { time: { year: 2018, month: 10, day: 19 }, value: 37.401446370157814 },
        { time: { year: 2018, month: 10, day: 20 }, value: 44.14728329801845 },
        { time: { year: 2018, month: 10, day: 21 }, value: 43.908512951087765 },
        { time: { year: 2018, month: 10, day: 22 }, value: 47.139711966410914 },
        { time: { year: 2018, month: 10, day: 23 }, value: 43.78495537329606 },
        { time: { year: 2018, month: 10, day: 24 }, value: 46.37910782721347 },
        { time: { year: 2018, month: 10, day: 25 }, value: 48.280192310089234 },
        { time: { year: 2018, month: 10, day: 26 }, value: 49.63767420501933 },
        { time: { year: 2018, month: 10, day: 27 }, value: 43.05752682224708 },
        { time: { year: 2018, month: 10, day: 28 }, value: 48.32708061157758 },
        { time: { year: 2018, month: 10, day: 29 }, value: 53.39600337663517 },
        { time: { year: 2018, month: 10, day: 30 }, value: 46.711006266435355 },
        { time: { year: 2018, month: 10, day: 31 }, value: 54.13809826985657 },
        { time: { year: 2018, month: 11, day: 1 }, value: 55.79021790616995 },
        { time: { year: 2018, month: 11, day: 2 }, value: 49.2873885580548 },
        { time: { year: 2018, month: 11, day: 3 }, value: 56.97009522871737 },
        { time: { year: 2018, month: 11, day: 4 }, value: 50.823930530973975 },
        { time: { year: 2018, month: 11, day: 5 }, value: 54.960060077375076 },
        { time: { year: 2018, month: 11, day: 6 }, value: 62.0222568413422 },
        { time: { year: 2018, month: 11, day: 7 }, value: 58.20081640960216 },
        { time: { year: 2018, month: 11, day: 8 }, value: 65.13004590769961 },
        { time: { year: 2018, month: 11, day: 9 }, value: 57.78891076252559 },
        { time: { year: 2018, month: 11, day: 10 }, value: 58.792896124952186 },
        { time: { year: 2018, month: 11, day: 11 }, value: 61.87890147945707 },
        { time: { year: 2018, month: 11, day: 12 }, value: 60.93156560716248 },
        { time: { year: 2018, month: 11, day: 13 }, value: 57.85928164082374 },
        { time: { year: 2018, month: 11, day: 14 }, value: 70.95139577968187 },
        { time: { year: 2018, month: 11, day: 15 }, value: 71.59735270974251 },
        { time: { year: 2018, month: 11, day: 16 }, value: 68.6730845432055 },
        { time: { year: 2018, month: 11, day: 17 }, value: 70.1298800651962 },
        { time: { year: 2018, month: 11, day: 18 }, value: 68.82963709012753 },
        { time: { year: 2018, month: 11, day: 19 }, value: 70.66316240517193 },
        { time: { year: 2018, month: 11, day: 20 }, value: 67.83320577283186 },
        { time: { year: 2018, month: 11, day: 21 }, value: 75.08486799785067 },
        { time: { year: 2018, month: 11, day: 22 }, value: 72.87979342888752 },
        { time: { year: 2018, month: 11, day: 23 }, value: 78.84973566116827 },
        { time: { year: 2018, month: 11, day: 24 }, value: 77.59573370643601 },
        { time: { year: 2018, month: 11, day: 25 }, value: 74.74726921909757 },
        { time: { year: 2018, month: 11, day: 26 }, value: 69.68128245039887 },
        { time: { year: 2018, month: 11, day: 27 }, value: 84.2489916330028 },
        { time: { year: 2018, month: 11, day: 28 }, value: 85.49947753269504 },
        { time: { year: 2018, month: 11, day: 29 }, value: 79.8486264148003 },
        { time: { year: 2018, month: 11, day: 30 }, value: 87.69287202402485 },
        { time: { year: 2018, month: 12, day: 1 }, value: 78.01690218289475 },
        { time: { year: 2018, month: 12, day: 2 }, value: 90.03789034980372 },
        { time: { year: 2018, month: 12, day: 3 }, value: 80.8840602849401 },
        { time: { year: 2018, month: 12, day: 4 }, value: 76.88131503723805 },
        { time: { year: 2018, month: 12, day: 5 }, value: 80.31060219295262 },
        { time: { year: 2018, month: 12, day: 6 }, value: 93.94619117220051 },
        { time: { year: 2018, month: 12, day: 7 }, value: 94.87133202008548 },
        { time: { year: 2018, month: 12, day: 8 }, value: 82.60328626838404 },
        { time: { year: 2018, month: 12, day: 9 }, value: 97.16768398118845 },
        { time: { year: 2018, month: 12, day: 10 }, value: 86.28219316727935 },
        { time: { year: 2018, month: 12, day: 11 }, value: 88.98768390749808 },
        { time: { year: 2018, month: 12, day: 12 }, value: 86.9799632094888 },
        { time: { year: 2018, month: 12, day: 13 }, value: 94.84612878449812 },
        { time: { year: 2018, month: 12, day: 14 }, value: 102.1160216124386 },
        { time: { year: 2018, month: 12, day: 15 }, value: 87.0646295567293 },
        { time: { year: 2018, month: 12, day: 16 }, value: 88.48802912330535 },
        { time: { year: 2018, month: 12, day: 17 }, value: 89.68490260440238 },
        { time: { year: 2018, month: 12, day: 18 }, value: 86.66224375818467 },
        { time: { year: 2018, month: 12, day: 19 }, value: 88.05916917094234 },
        { time: { year: 2018, month: 12, day: 20 }, value: 78.96513176162487 },
        { time: { year: 2018, month: 12, day: 21 }, value: 90.54239307317953 },
        { time: { year: 2018, month: 12, day: 22 }, value: 92.40550159209458 },
        { time: { year: 2018, month: 12, day: 23 }, value: 82.47365747958841 },
        { time: { year: 2018, month: 12, day: 24 }, value: 91.55327647717618 },
        { time: { year: 2018, month: 12, day: 25 }, value: 89.34790162747024 },
        { time: { year: 2018, month: 12, day: 26 }, value: 85.68927849920716 },
        { time: { year: 2018, month: 12, day: 27 }, value: 85.86795553966918 },
        { time: { year: 2018, month: 12, day: 28 }, value: 90.55358282944198 },
        { time: { year: 2018, month: 12, day: 29 }, value: 91.28939932554621 },
        { time: { year: 2018, month: 12, day: 30 }, value: 100.90495261248472 },
        { time: { year: 2018, month: 12, day: 31 }, value: 98.99348823473713 },
      ])

    return () => {
      chart.remove()
    }
  }, [])

  return <div className="strat-chart" ref={chartContainerRef}></div>
}
