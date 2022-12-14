import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Container, Typography, IconButton, BoxProps, Stack, Pagination, Skeleton, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useGetCategoriesQuery } from 'store'
import CategoryComponent from 'components/Category'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import CategoryIcon from '@mui/icons-material/Category'
import type { Category } from 'store'
import { Add as AddIcon } from '@mui/icons-material'

interface Props {}

const skeletons = Array(10).fill('')

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const drawerWidth = 240

const CategoryWrapper = styled(Box)<BoxProps>(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '12px',
    // '&:last-child': {
    //   marginBottom: '0',
    // },
  }
})

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  position: 'static',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  position: 'static',
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  position: 'static',
}))

export const AdminPage: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = searchParams.get('page') ?? 1
  const editId = searchParams.get('editId') ?? ''

  const { data, isFetching } = useGetCategoriesQuery({ page: currentPage, take: 10 })

  const handlePageClick = (e: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams({ page: page.toString() })
  }

  const [open, setOpen] = React.useState(false)
  console.log('AdminPage RERENDER')

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ display: 'flex', minWidth: '300px', overflowX: 'hidden' }}>
      <Drawer variant='permanent' open={open}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleDrawerOpen}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          {['??????????????????', '????????????????????'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleDrawerOpen}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Trash'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleDrawerOpen}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Container maxWidth='md' sx={{ minWidth: '300px', overflowX: 'hidden', py: 5 }}>
        <Button
          variant='outlined'
          color='secondary'
          startIcon={<AddIcon />}
          sx={{ mb: 4 }}
          onClick={e => {
            setIsOpened(true)
          }}
        >
          ???????????????? ??????????????????
        </Button>
        <CategoryComponent isOpened={isOpened || !!editId} setIsOpened={setIsOpened} />
        {isFetching ? (
          <Stack spacing={2}>
            {skeletons.map((el, idx) => {
              return <Skeleton variant='rounded' width={'80%'} height={30} key={idx} />
            })}
          </Stack>
        ) : (
          <>
            {data &&
              data.data.map((category: Category) => {
                return (
                  <CategoryWrapper key={category.id}>
                    <Typography>{category.title}</Typography>
                    <IconButton
                      sx={{ ml: 2 }}
                      size='small'
                      onClick={e => {
                        setSearchParams({
                          ...Object.fromEntries(new URLSearchParams(searchParams)),
                          editId: category.id.toString(),
                        })
                        // setIsOpened(true)
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </CategoryWrapper>
                )
              })}

            <Stack spacing={2}>
              <Pagination
                count={data?.lastPage || 1}
                page={+currentPage}
                onChange={handlePageClick}
                boundaryCount={1}
              />
            </Stack>
          </>
        )}
      </Container>
    </Box>
  )
}
