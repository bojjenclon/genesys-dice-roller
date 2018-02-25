import React, { Component } from 'react'
import './App.css'

// https://material-ui-next.com/
import Reboot from 'material-ui/Reboot'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home'

import BottomNav from './components/BottomNav.jsx'
import DiceRoller from './components/DiceRoller.jsx'
import Die from './components/Die.jsx'

const symbols = {
  blank: '-',
  success: 'S',
  advantage: 'A',
  triumph: 'T',
  failure: 'F',
  threat: 'H',
  despair: 'D'
}

const symbolToName = {
  'S': 'success',
  'A': 'advantage',
  'T': 'triumph',
  'F': 'failure',
  'H': 'threat',
  'D': 'despair'
}

const boostDie = [
  symbols.blank,
  symbols.blank,
  symbols.success,
  symbols.success + symbols.advantage,
  symbols.advantage + symbols.advantage,
  symbols.advantage
]

const setbackDie = [
  symbols.blank,
  symbols.blank,
  symbols.failure,
  symbols.failure,
  symbols.threat,
  symbols.threat
]

const abilityDie = [
  symbols.blank,
  symbols.success,
  symbols.success,
  symbols.success + symbols.success,
  symbols.advantage,
  symbols.advantage,
  symbols.success + symbols.advantage,
  symbols.advantage + symbols.advantage
]

const difficultyDie = [
  symbols.blank,
  symbols.failure,
  symbols.failure + symbols.failure,
  symbols.threat,
  symbols.threat,
  symbols.threat,
  symbols.threat + symbols.threat,
  symbols.failure + symbols.threat
]

const proficiencyDie = [
  symbols.blank,
  symbols.success,
  symbols.success,
  symbols.success + symbols.success,
  symbols.success + symbols.success,
  symbols.advantage,
  symbols.success + symbols.advantage,
  symbols.success + symbols.advantage,
  symbols.success + symbols.advantage,
  symbols.advantage + symbols.advantage,
  symbols.advantage + symbols.advantage,
  symbols.triumph
]

const challengeDie = [
  symbols.blank,
  symbols.failure,
  symbols.failure,
  symbols.failure + symbols.failure,
  symbols.failure + symbols.failure,
  symbols.threat,
  symbols.threat,
  symbols.threat,
  symbols.failure + symbols.threat,
  symbols.failure + symbols.threat,
  symbols.threat + symbols.threat,
  symbols.threat + symbols.threat,
  symbols.despair
]

function randomElement(array) {
  return array[Math.floor(Math.random()* array.length)]
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 24, flex: 1, overflow: 'auto' }}>
      {props.children}
    </Typography>
  )
}

function RolledDiceDisplay(props) {
  return (
    <Grid container spacing={16}>
      <Grid item xs={12} md={2}>
        <h3>{props.label}</h3>
      </Grid>
      <Grid item xs={12} md={10}>
        <Grid container spacing={16} alignItems="center">
          {props.dice}
        </Grid>
      </Grid>
    </Grid>
  )
}

function Green(props) {
  return (
    <span style={{color: '#00cc00'}}>{props.children}</span>
  )
}

function Red(props) {
  return (
    <span style={{color: '#ff0000'}}>{props.children}</span>
  )
}

function Dull(props) {
  return (
    <span style={{color: 'rgba(0, 0, 0, 0.34)'}}>{props.children}</span>
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 0,
      inputStorage: 0,
      dice: {
        boost: {
          numDice: 0,
          rolls: []
        },
        setback: {
          numDice: 0,
          rolls: []
        },
        ability: {
          numDice: 0,
          rolls: []
        },
        difficulty: {
          numDice: 0,
          rolls: []
        },
        proficiency: {
          numDice: 0,
          rolls: []
        },
        challenge: {
          numDice: 0,
          rolls: []
        }
      },
      results: {
        success: 0,
        advantage: 0,
        triumph: 0,
        failure: 0,
        threat: 0,
        despair: 0
      },
      hasResults: false
    }
  }

  onTabChanged = (e, tab) => {
    this.setState({tab: tab})
  }

  diceRollerFocused = (e) => {
    const state = {
      inputStorage: e.target.value,
      dice: {...this.state.dice}
    }
    state.dice[e.target.name] = {
      numDice: ''
    }

    this.setState(state)
  }

  diceRollerBlurred = (e) => {
    if (e.target.value === '') {
      const state = {
        dice: {...this.state.dice}
      }
      state.dice[e.target.name] = {
        numDice: this.state.inputStorage
      }

      this.setState(state)
    }
  }

  diceRollerChanged = (e) => {
    let value = e.target.value
    const max = parseInt(e.target.max, 10)

    if (value < 0) {
      value = 0
    } else if (value > max) {
      value = max
    }

    const state = {
      dice: {...this.state.dice}
    }
    state.dice[e.target.name] = {
      numDice: value
    }

    this.setState(state)
  }

  handleRollClicked = () => {
    const state = this.state
    state.tab = 2
    state.hasResults = true

    state.dice.boost.rolls = []
    state.dice.setback.rolls = []
    state.dice.ability.rolls = []
    state.dice.difficulty.rolls = []
    state.dice.proficiency.rolls = []
    state.dice.challenge.rolls = []

    const results = {
      success: 0,
      advantage: 0,
      triumph: 0,
      failure: 0,
      threat: 0,
      despair: 0
    }

    const separateAndAdd = function (value, arr) {
      if (value.length === 0) {
        return false
      }
     
      for (let i = 0; i < value.length; i++) {
        const char = value.charAt(i)
        const name = symbolToName[char]
        results[name]++
       
        if (name === 'triumph') {
          results.success++
        }
        else if (name === 'despair') {
          results.failure++
        }

        arr.push(char)
      }
     
      return true
    }

    for (let i = 0; i < this.state.dice.boost.numDice; i++) {
      const value = randomElement(boostDie)
      separateAndAdd(value, state.dice.boost.rolls)
    }

    for (let i = 0; i < this.state.dice.setback.numDice; i++) {
      const value = randomElement(setbackDie)
      separateAndAdd(value, state.dice.setback.rolls)
    }

    for (let i = 0; i < this.state.dice.ability.numDice; i++) {
      const value = randomElement(abilityDie)
      separateAndAdd(value, state.dice.ability.rolls)
    }

    for (let i = 0; i < this.state.dice.difficulty.numDice; i++) {
      const value = randomElement(difficultyDie)
      separateAndAdd(value, state.dice.difficulty.rolls)
    }

    for (let i = 0; i < this.state.dice.proficiency.numDice; i++) {
      const value = randomElement(proficiencyDie)
      separateAndAdd(value, state.dice.proficiency.rolls)
    }

    for (let i = 0; i < this.state.dice.challenge.numDice; i++) {
      const value = randomElement(challengeDie)
      separateAndAdd(value, state.dice.challenge.rolls)
    }

    state.results = results

    this.setState(state)
  }

  render() {
    const mapDice = (arr, rolls, type, inverted) => {
      for (let i = 0; i < rolls.length; i++) {
        arr.push(
          <Grid item xl={1} key={i}>
            <Die face={rolls[i]} type={type} inverted={inverted} />
          </Grid>
        )
      }
    }

    const dice = {
      boost: [],
      setback: [],
      ability: [],
      difficulty: [],
      proficiency: [],
      challenge: []
    }

    const data = {}

    if (this.state.tab === 1) {
      mapDice(dice.boost, this.state.dice.boost.rolls, 'boost')
      mapDice(dice.setback, this.state.dice.setback.rolls, 'setback', true)
      mapDice(dice.ability, this.state.dice.ability.rolls, 'ability')
      mapDice(dice.difficulty, this.state.dice.difficulty.rolls, 'difficulty', true)
      mapDice(dice.proficiency, this.state.dice.proficiency.rolls, 'proficiency')
      mapDice(dice.challenge, this.state.dice.challenge.rolls, 'challenge', true)
    } else if (this.state.tab === 2) {
      const successVsFailure = this.state.results.success - this.state.results.failure
      const advantageVsThreat = this.state.results.advantage - this.state.results.threat

      data.svf = successVsFailure
      data.avt = advantageVsThreat

      data.classes = {
        tableBody: {
          fontWeight: 'bold'
        },
        svf: {
          color: successVsFailure > 0 ? '#00cc00' : '#ff0000'
        },
        avt: {
          color: advantageVsThreat > 0 ? '#00cc00' : '#ff0000'
        },
        triumph: {
          color: this.state.results.triumph > 0 ? '#00cc00' : 'rgba(0, 0, 0, 0.34)'
        },
        despair: {
          color: this.state.results.despair > 0 ? '#ff0000' : 'rgba(0, 0, 0, 0.34)'
        }
      }
    }

    return (
      <div style={{display: 'flex', justifyContent: 'center'}} className="Root">
        <Reboot />

        <Paper className="App" style={{ width: '1024px', height: '100vh', display: 'flex', flexDirection: 'column' }}>

          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Home" href="/">
                <HomeIcon />
              </IconButton>
              <Typography variant="title" color="inherit" style={{ flex: 1, textAlign: 'left' }}>
                bojjenclon
              </Typography>
              <Typography variant="subtitle" color="inherit" style={{ flex: 1, textAlign: 'right' }}>
                Genesys Dice Roller
              </Typography>
            </Toolbar>
          </AppBar>

          {this.state.tab === 0 &&
            <TabContainer>
              <Grid container spacing={16} justify="center">
                <Grid item sm={2}>
                  <DiceRoller name="boost" value={this.state.dice.boost.numDice} onChangeCallback={this.diceRollerChanged} onFocusCallback={this.diceRollerFocused} onBlurCallback={this.diceRollerBlurred} max={6} />
                </Grid>
                <Grid item sm={2}>
                  <DiceRoller name="setback" value={this.state.dice.setback.numDice} onChangeCallback={this.diceRollerChanged} onFocusCallback={this.diceRollerFocused} onBlurCallback={this.diceRollerBlurred} max={6} />
                </Grid>
                <Grid item sm={2}>
                  <DiceRoller name="ability" value={this.state.dice.ability.numDice} onChangeCallback={this.diceRollerChanged} onFocusCallback={this.diceRollerFocused} onBlurCallback={this.diceRollerBlurred} max={8} />
                </Grid>
                <Grid item sm={2}>
                  <DiceRoller name="difficulty" value={this.state.dice.difficulty.numDice} onChangeCallback={this.diceRollerChanged} onFocusCallback={this.diceRollerFocused} onBlurCallback={this.diceRollerBlurred} max={8} />
                </Grid>
                <Grid item sm={2}>
                  <DiceRoller name="proficiency" value={this.state.dice.proficiency.numDice} onChangeCallback={this.diceRollerChanged} onFocusCallback={this.diceRollerFocused} onBlurCallback={this.diceRollerBlurred} max={12} />
                </Grid>
                <Grid item sm={2}>
                  <DiceRoller name="challenge" value={this.state.dice.challenge.numDice} onChangeCallback={this.diceRollerChanged} onFocusCallback={this.diceRollerFocused} onBlurCallback={this.diceRollerBlurred} max={12} />
                </Grid>
              </Grid>

              <Grid container spacing={16} justify="center">
                <Grid item xs={3}>
                  <Button color="primary" variant="raised" fullWidth={true} onClick={this.handleRollClicked}>Roll</Button>
                </Grid>
              </Grid>
            </TabContainer>
          }

          {this.state.tab === 1 &&
            <TabContainer>

              <RolledDiceDisplay label="Boost" dice={dice.boost} />
              <RolledDiceDisplay label="Setback" dice={dice.setback} />
              <RolledDiceDisplay label="Ability" dice={dice.ability} />
              <RolledDiceDisplay label="Difficulty" dice={dice.difficulty} />
              <RolledDiceDisplay label="Proficiency" dice={dice.proficiency} />
              <RolledDiceDisplay label="Challenge" dice={dice.challenge} />
              
            </TabContainer>
          }

          {this.state.tab === 2 &&
            <TabContainer>

              <Grid container spacing={16} justify="space-between">
                <Grid item xs={12} sm={6}>
                  {data.svf > 0 ? (
                    <div><Green>Success</Green> vs <Dull>Failure</Dull></div>
                  ) : (
                    <div><Dull>Success</Dull> vs <Red>Failure</Red></div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {data.svf > 0 ? (
                    <Green>{Math.abs(data.svf)}</Green>
                  ) : (
                    <Red>{Math.abs(data.svf)}</Red>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  {data.avt > 0 ? (
                    <div><Green>Advantage</Green> vs <Dull>Threat</Dull></div>
                  ) : (
                    <div><Dull>Advantage</Dull> vs <Red>Threat</Red></div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {data.avt > 0 ? (
                    <Green>{Math.abs(data.avt)}</Green>
                  ) : (
                    <Red>{Math.abs(data.avt)}</Red>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  {this.state.results.triumph > 0 ? (
                    <div><Green>Triumph</Green></div>
                  ) : (
                    <div><Dull>Triumph</Dull></div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {this.state.results.triumph > 0 ? (
                    <Green>{this.state.results.triumph}</Green>
                  ) : (
                    <Dull>{this.state.results.triumph}</Dull>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  {this.state.results.despair > 0 ? (
                    <div><Red>Despair</Red></div>
                  ) : (
                    <div><Dull>Despair</Dull></div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {this.state.results.despair > 0 ? (
                    <Red>{this.state.results.despair}</Red>
                  ) : (
                    <Dull>{this.state.results.despair}</Dull>
                  )}
                </Grid>
              </Grid>

            </TabContainer>
          }

          <BottomNav tab={this.state.tab} onChange={this.onTabChanged} disabled={!this.state.hasResults} />
          
          {/* <BottomNavigation showLabels value={this.state.tab} onChange={this.onTabChanged} style={{ backgroundColor: '#ff0000' }}>
            <BottomNavigationAction icon={<InputIcon />} label="Dice Roller" />
            <BottomNavigationAction icon={<ViewListIcon />} label="Rolled Dice" disabled={!this.state.hasResults} />
            <BottomNavigationAction icon={<DoneIcon />} label="Result" disabled={!this.state.hasResults} />
          </BottomNavigation> */}

          {/* <AppBar position="static">
            <Toolbar>
              <Tabs value={this.state.tab} onChange={this.onTabChanged} centered style={{ flex: 1 }}>
                <Tab icon={<InputIcon />} label="Dice Roller" />
                <Tab icon={<ViewListIcon />} label="Rolled Dice" disabled={!this.state.hasResults} />
                <Tab icon={<DoneIcon />} label="Result" disabled={!this.state.hasResults} />
              </Tabs>
            </Toolbar>
          </AppBar> */}

        </Paper>
      </div>
    )
  }
}

export default App
