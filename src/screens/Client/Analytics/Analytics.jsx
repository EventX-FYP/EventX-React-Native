import React from 'react'
import { ScrollView, StatusBar, SafeAreaView, useWindowDimensions, Text, StyleSheet } from 'react-native'
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit'
import { AppHelper } from '../../../helper'
import { data, contributionData, pieChartData, progressChartData } from './data'

const chartConfigs = [
  {
    backgroundColor: '#26872a',
    // backgroundGradientFrom: '#43a047',
    // backgroundGradientTo: '#66bb6a',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(67, 160, 71, ${opacity})`,
    style: {
      borderRadius: 16
    }
  },
]

export const Analytics = () => {
  const { width } = useWindowDimensions();
  const height = 220;
  return (
    <ScrollView horizontal={true}>
        {chartConfigs.map((chartConfig, index) => {
          const labelStyle = {
            color: AppHelper.material.green600,
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold'
          }
          const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style
          }
          return (
            <ScrollView key={index}>
              <Text style={labelStyle}>Bezier Line Chart</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                bezier
                style={graphStyle}
              />
              <Text style={labelStyle}>Progress Chart</Text>
              <ProgressChart
                data={progressChartData}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Bar Graph</Text>
              <BarChart
                width={width}
                height={height}
                data={data}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Pie Chart</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
              <Text style={labelStyle}>Line Chart</Text>
              <LineChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                style={graphStyle}
              />
              <Text style={labelStyle}>Contribution Graph</Text>
              <ContributionGraph
                values={contributionData}
                width={width}
                height={height}
                endDate={new Date('2016-05-01')}
                numDays={105}
                chartConfig={chartConfig}
                style={graphStyle}
              />
            </ScrollView>
          )
        })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})