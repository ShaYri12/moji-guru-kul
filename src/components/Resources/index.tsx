'use client'
import * as React from 'react'
import { styled } from '@mui/system'
import { Tabs } from '@mui/base/Tabs'
import { TabsList as BaseTabsList } from '@mui/base/TabsList'
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel'
import { buttonClasses } from '@mui/base/Button'
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab'

const Resources = () => {
  return (
    <Tabs defaultValue={0} className="horizontal-spacing">
      <TabsList>
        <Tab value={0}>Blog</Tab>
        <Tab value={1} disabled>
          Video Material
        </Tab>
        <Tab value={2} disabled>
          Guide
        </Tab>
      </TabsList>
      <TabPanel value={0}>
        {/* <Blog /> */}
      </TabPanel>
      <TabPanel value={1}></TabPanel>
      <TabPanel value={2}></TabPanel>
    </Tabs>
  )
}

export default Resources

const Tab = styled(BaseTab)`
  color: #753cbd;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  background-color: transparent;
  width: 120px;
  padding: 10px 0;
  margin: 6px;
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #f1ecf8;
  }

  &:focus {
    color: #753cbd;
    outline: 1px solid #f1ecf8;
    background-color: #f1ecf8;
  }

  &.${tabClasses.selected} {
    background-color: #f1ecf8;
    color: #753cbd;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    color: #656467;
    font-weight: 400;
  }
`

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  `
)

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  border-radius: 12px;
  margin-top: 80px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
    @media (max-width: 600px) {
        margin-top: 40px;
    }
  `
)
