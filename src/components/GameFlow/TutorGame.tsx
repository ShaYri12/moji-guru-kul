import { useActivityStore } from '@/store/activityStore'
import { useAuthStore } from '@/store/authStore'
import { normalizeGameUrl } from '@/utils/helperFunctions'
import classNames from 'classnames'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import GameTile from '../common/Cards/GameTile'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import LanguageDropdown from '../common/Tables/LanguageDropdown'
import CustomSelect from '../common/CustomSelect'
import CustomInput from '../common/CustomInput'
import { a11yProps, CustomTabPanel } from './GameList'
import { TutorsForStudentTypes } from '@/utils/types'
import { useErrorStore } from '@/store/errorStore'

type GameFlowProps = {
  tutors: TutorsForStudentTypes[]
}

const TutorGame = ({ tutors }: GameFlowProps) => {
  const [tabValue, setTabValue] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const tutorGames = useActivityStore((state) => state.activities)

  const getActivityDetails = useActivityStore((state) => state.getActivityDetails)
  const getActivityDetailsByGameflow = useActivityStore((state) => state.getActivityDetailsByGameflow)
  const activitiesByGameflow = useActivityStore((state) => state.activitiesByGameflow)
  const getActivities = useActivityStore((state) => state.getActivities)
  const activeActivity = useActivityStore((state) => state.activeActivity)
  const setActiveActivity = useActivityStore((state) => state.setActiveActivity)
  const setAlert = useErrorStore((state) => state.setAlert)
  const filteredActivities = useActivityStore((state) => state.filteredActivities)
  const filteredGameflowActivities = useActivityStore((state) => state.filteredGameflowActivities)
  const setFilteredActivities = useActivityStore((state) => state.setFilteredActivities)
  const setFilteredActivitiesByGameflow = useActivityStore((state) => state.setFilteredActivitiesByGameflow)
  const getActivitiesByGroup = useActivityStore((state) => state.getActivitiesByGroup)

  console.log('tutors--------------------/', tutors)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    ;(async () => {
      if (!user) return
      if (tutors?.[0]?.groupId) {
        getActivitiesByGroup({ assignedToId: tutors?.[0]?.groupId, assignedById: tutors?.[0]?.tutorId })
        setActiveActivity(tutors?.[0])
        return
      }
      getActivities({ assignedToId: user?.id, assignedById: tutors?.[0]?.tutorId })
      setActiveActivity(tutors?.[0])
    })()
  }, [user])

  return (
    <div>
      <Box sx={{ width: '100%', mb: 6 }}>
        <Box
          sx={{
            border: '1px solid #EBE9E9',
            borderRadius: '4px',
            minHeight: '63px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2,
            pr: 4,
            // for mobile screen display flex column
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '10px',
              height: 'auto',
              alignItems: 'center',
              pr: 0,
            },
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{}}
            TabIndicatorProps={{
              sx: {
                backgroundColor: '#753CBD',
              },
            }}
          >
            <Tab
              sx={{
                height: '63px',
                '&.Mui-selected': {
                  color: '#753CBD',
                },
                // bottom border color
                '&.Mui-selected::after': {
                  backgroundColor: '#753CBD',
                },
              }}
              label="Single"
              {...a11yProps(0)}
            />
            <Tab
              label="Multi"
              {...a11yProps(1)}
              sx={{
                '&.Mui-selected': {
                  color: '#753CBD',
                },
              }}
            />
          </Tabs>

          <div className="flex items-center gap-4">
            <CustomSelect
              label="Sort By"
              options={[
                {
                  name: 'Best Match',
                  value: 'bestMatch',
                },
                {
                  name: 'Newest',
                  value: 'newest',
                },
                {
                  name: 'Oldest',
                  value: 'oldest',
                },
              ]}
              value="bestMatch"
              handleChange={() => {}}
              width="140px"
            />
            <LanguageDropdown
              options={[
                { name: 'Hindi', value: 'hindi' },
                { name: 'English', value: 'english' },
              ]}
              value="hindi"
              handleChange={() => {}}
              width="100px"
            />
          </div>
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <CustomInput
            value={searchValue}
            onChange={(e) => {
              if (tabValue === 0) {
                setSearchValue(e.target.value)
                if (!e.target.value) {
                  setFilteredActivities(tutorGames) // Todo: handle filtered activities
                }
              }
              if (tabValue === 1) {
                setSearchValue(e.target.value)
                if (!e.target.value) {
                  setFilteredActivitiesByGameflow(activitiesByGameflow) // Todo: handle filtered gameflow activities
                }
              }
            }}
            onClick={() => {
              if (tabValue === 0) {
                const filter = tutorGames.filter((game) => game.title.toLowerCase().includes(searchValue.toLowerCase()))
                setFilteredActivities(filter)
              }
              if (tabValue === 1) {
                const filter = activitiesByGameflow.filter((game) => game.title.toLowerCase().includes(searchValue.toLowerCase()))
                setFilteredActivitiesByGameflow(filter)
              }
            }}
            placeholder="Search more games"
            type="search"
            size="large"
            className="!rounded bg-fantasy !border-none"
          />
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <div className="flex flex-col gap-10">
            {filteredActivities.length ? (
              <>
                {filteredActivities.map((game) => (
                  <GameTile
                    key={game.id}
                    title={game.title}
                    description={game.description}
                    activityTypeName={game.activityTypeName}
                    isLocked={false}
                    status={game.status}
                    creationDate={game.creationDate}
                    endDate={game.completionDate ? game.completionDate : game.deadline}
                    gameScore={game.gameScore}
                    points={game.points}
                    groupName={activeActivity?.groupName}
                    isTutor={true}
                    deadlineDate={game.deadline}
                    onClick={async () => {
                      if (game.activityTypeId === 2) {
                        if (!game.gameURL) return setAlert({ message: 'Game URL not found', type: 'error' })
                        const normalizedUrl = normalizeGameUrl(game.gameURL, token)
                        window.open(normalizedUrl, '_blank')
                      }
                      if (game.activityTypeId === 1 || game.activityTypeId === 5) {
                        const response = await getActivityDetails({
                          activityTypeId: game.activityTypeId,
                          activityId: game.id,
                          gameflowGameId: 0,
                        })
                        if (response && response.gameURL) {
                          const normalizedUrl = normalizeGameUrl(response.gameURL, token)
                          window.open(normalizedUrl, '_blank')
                        }
                      }
                    }}
                  />
                ))}
              </>
            ) : (
              <p className="p-4 text-indigo">No games found.</p>
            )}
          </div>
        </CustomTabPanel>

        {/* //! Tutor Gameflows */}
        <CustomTabPanel value={tabValue} index={1}>
          <div className="flex flex-col gap-10">
            {filteredGameflowActivities.length ? (
              <>
                {filteredGameflowActivities.map((activity) => (
                  <GameTile
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    activityTypeName={activity.activityTypeName}
                    isGameFlow={activity.activityTypeId === 3}
                    isLocked={false}
                    status={activity.status}
                    creationDate={activity.creationDate}
                    endDate={activity.completionDate ? activity.completionDate : activity.deadline} // Todo: handle deadline
                    gameScore={activity.gameScore}
                    points={activity.points}
                    gameflows={activity.gameFlowDetails?.games}
                    isTutor={true}
                    onClick={async () => {
                      if (activity.activityTypeId === 3) {
                        if (activity.gameURL) {
                          const normalizedUrl = normalizeGameUrl(activity.gameURL, token)
                          window.open(normalizedUrl, '_blank')
                        }
                      }
                    }}
                  />
                ))}
              </>
            ) : (
              <p className="p-4 text-indigo">No gamesflows found.</p>
            )}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default TutorGame
