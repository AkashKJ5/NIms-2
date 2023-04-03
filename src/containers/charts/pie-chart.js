import { Card, Container } from '@mui/material'
import React, { useState } from 'react'

import CardContent from '@mui/material/CardContent'
import { Chart } from 'primereact/chart'

const PieChart = () => {
  const [chartData] = useState({
    labels: ['Total Projects', 'Snaging', 'Desnaging', 'Fix'],
    datasets: [
      {
        data: [300, 50, 100, 150],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#54B4D3'],
        hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#3B71CA']
      }
    ]
  })

  const [lightOptions] = useState({
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#495057'
        }
      }
    }
  })

  return (
    <Container maxWidth='xl'>
      <Card style={{ marginTop: '4.5rem' }} sx={{ maxWidth: 'xl' }}>
        <CardContent>
          <div className='card flex justify-content-center'>
            <Chart
              type='pie'
              data={chartData}
              options={lightOptions}
              style={{
                position: 'relative',
                width: '40%',
                margin: 'auto'
              }}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}

export default PieChart
