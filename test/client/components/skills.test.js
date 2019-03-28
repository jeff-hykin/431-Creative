import React from 'react'
import { mount } from 'enzyme'

import { expect } from 'chai'
import { SkillChips } from '../../../client/components/skills'

describe('<SkillChips />', () => {
  let props
  let mountedSkillChips
  const postingsComponent = () => {
    if (!mountedSkillChips) {
      mountedSkillChips = mount(
        <SkillChips {...props} />
      )
    }
    return mountedSkillChips
  }

  beforeEach(() => {
    props = {
      skills: undefined,
      classes: undefined
    }
    mountedSkillChips = undefined
  })

  it('is able to mount 1 chip', () => {
    props = {
      skills: ['React'],
      classes: {}
    }
    const section = postingsComponent().find('span')
    expect(section.length).to.be.eq(1)
  })
})
