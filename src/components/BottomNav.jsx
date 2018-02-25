import React from 'react'
import { withStyles } from 'material-ui/styles'

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation'
import InputIcon from 'material-ui-icons/Input'
import ViewListIcon from 'material-ui-icons/ViewList'
import DoneIcon from 'material-ui-icons/Done'

const styles = theme => ({
  nav: {
    backgroundColor: theme.palette.primary.main,
  },
  actionRoot: {
    color: theme.palette.primary.contrastText,
  },
  actionSelected: {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
  actionDisabled: {
    color: theme.palette.grey[300]
  }
})

function BottomNav(props) {
  const { classes } = props
  const actionClasses = { 
    root: classes.actionRoot, 
    selected: classes.actionSelected
  }
  
  let classNames = ''
  if (props.disabled) {
    classNames += 'BottomNav-disabled'
  }

  return (
    <BottomNavigation showLabels value={props.tab} onChange={props.onChange} classes={{ root: classes.nav }}>
      <BottomNavigationAction icon={<InputIcon />} label="Dice Roller" classes={actionClasses} />
      <BottomNavigationAction icon={<ViewListIcon />} label="Rolled Dice" disabled={props.disabled} classes={actionClasses} className={classNames} />
      <BottomNavigationAction icon={<DoneIcon />} label="Result" disabled={props.disabled} classes={actionClasses} className={classNames} />
    </BottomNavigation>
  )
}

export default withStyles(styles)(BottomNav)
