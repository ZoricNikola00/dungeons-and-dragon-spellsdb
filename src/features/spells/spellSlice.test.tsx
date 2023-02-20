import spellSlice, { addFavorite } from './spellSlice'
import reducer, { getAllSpells, getSpell } from './spellSlice'

describe('addFavorite', () => {
  it('should add a spell to the favorite list', () => {
    const initialState = {
      spells: [],
      isLoading: true,
      spell: null,
      favorite: [],
    }
    const newSpell = {
      index: 'abc123',
      name: 'Fireball',
      url: 'https://www.dnd5eapi.co/api/spells/fireball',
    }
    const nextState = spellSlice(initialState, {
      type: addFavorite.type,
      payload: newSpell,
    })
    expect(nextState.favorite).toHaveLength(1)
    expect(nextState.favorite[0]).toEqual(newSpell)
  })
  it('should remove a spell from the favorite list if it already exists', () => {
    const initialState = {
      spells: [],
      isLoading: true,
      spell: null,
      favorite: [
        {
          index: '001',
          name: 'Fireball',
          desc: [
            'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.',
          ],
          higher_level: [
            'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.',
          ],
          range: '150 feet',
          components: ['V', 'S', 'M'],
          material: 'A tiny ball of bat guano and sulfur',
          area_of_effect: {
            type: 'Sphere',
            size: 20,
          },
          ritual: false,
          duration: 'Instantaneous',
          concentration: false,
          casting_time: '1 action',
          level: 3,
          attack_type: 'Dexterity',
          school: { index: 'Fire', name: 'fire', url: 'fire' },
          damage: {
            type: 'Fire',
            damage_at_slot_level_3: 8,
            damage_at_slot_level_4: 10,
            damage_at_slot_level_5: 12,
          },
          classes: [{ index: 'Fire', name: 'Wizard', url: '/api/classes/wizard' }],
          subclasses: [{ index: 'Fire', name: 'Wizard', url: '/api/classes/wizard' }],
          url: 'http://www.dnd5eapi.co/api/spells/1',
        },
      ],
    }
    const newSpell = {
      index: '001',
      name: 'Fireball',
      desc: [
        'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame.',
      ],
      higher_level: [
        'When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.',
      ],
      range: '150 feet',
      components: ['V', 'S', 'M'],
      material: 'A tiny ball of bat guano and sulfur',
      area_of_effect: {
        type: 'Sphere',
        size: 20,
      },
      ritual: false,
      duration: 'Instantaneous',
      concentration: false,
      casting_time: '1 action',
      level: 3,
      attack_type: 'Dexterity',
      school: { index: 'Fire', name: 'fire', url: 'fire' },
      damage: {
        type: 'Fire',
        damage_at_slot_level_3: 8,
        damage_at_slot_level_4: 10,
        damage_at_slot_level_5: 12,
      },
      classes: [{ index: 'Fire', name: 'Wizard', url: '/api/classes/wizard' }],
      subclasses: [{ index: 'Fire', name: 'Wizard', url: '/api/classes/wizard' }],
      url: 'http://www.dnd5eapi.co/api/spells/1',
    }
    const nextState = spellSlice(initialState, {
      type: addFavorite.type,
      payload: newSpell,
    })
    expect(nextState.favorite).toHaveLength(0)
  })
})

describe('slices', () => {
  const initialState = { spells: [], isLoading: true, spell: null, favorite: [] }
  it('set loading true when is getAllSpells pending', () => {
    const action = { type: getAllSpells.pending.type }
    const state = reducer(initialState, action)
    expect(state).toEqual({ spells: [], isLoading: true, spell: null, favorite: [] })
  })
  it('set loading false when is getAllSpells fullfiled', () => {
    const action = {
      type: getAllSpells.fulfilled.type,
      payload: [{ index: 'Spell', name: 'Spell-Name', url: 'spell/index' }],
    }
    const state = reducer(initialState, action)
    expect(state).toEqual({
      spells: [{ index: 'Spell', name: 'Spell-Name', url: 'spell/index' }],
      isLoading: false,
      spell: null,
      favorite: [],
    })
  }),
    it('set loading false when is getAllSpells rejected', () => {
      const action = { type: getAllSpells.rejected.type, payload: { error: 'some-error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ spells: [], isLoading: false, spell: null, favorite: [] })
    })

  it('set loading true when is getSpell pending', () => {
    const action = { type: getSpell.pending.type }
    const state = reducer(initialState, action)
    expect(state).toEqual({ spells: [], isLoading: true, spell: null, favorite: [] })
  })
  it('set loading false when is getSpell fullfiled', () => {
    const action = {
      type: getSpell.fulfilled.type,
      payload: { index: 'Spell', name: 'Spell-Name', url: 'spell/index' },
    }
    const state = reducer(initialState, action)
    expect(state).toEqual({
      spells: [],
      isLoading: false,
      spell: { index: 'Spell', name: 'Spell-Name', url: 'spell/index' },
      favorite: [],
    })
  }),
    it('set loading false when is getSpell rejected', () => {
      const action = { type: getSpell.rejected.type, payload: { error: 'some-error' } }
      const state = reducer(initialState, action)
      expect(state).toEqual({ spells: [], isLoading: false, spell: null, favorite: [] })
    })
})
