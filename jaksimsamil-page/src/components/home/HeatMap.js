import React, { use } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
/*
TODO: 날짜 범위 지정, 날짜별 검색 추가
*/
/*
solvedBJbyDATE:
solvedBJbyDATE:{
    20190304 : [Object]
    ...
}
*/
const HeatMap = (HMArr) => {
  return (
    <div>
      <CalendarHeatmap
        onClick={() => {
          console.log(HMArr);
        }}
        startDate={new Date('2020-01-01')}
        endDate={new Date('2020-12-01')}
        values={HMArr.HMArr}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value.date) {
            return {
              'data-tip': '',
            };
          } else {
            return {
              'data-tip': `${value.date}: ${value.count} 문제`,
            };
          }
        }}
        showWeekdayLabels={true}
      />
      <ReactTooltip />
    </div>
  );
};

export default HeatMap;
