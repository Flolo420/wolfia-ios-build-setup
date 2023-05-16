import * as core from '@actions/core'

// Indicates whether the action is running as post job cleanup.
export const isPost = !!core.getState('isPost')

// Publish a variable so the post action run knows to cleanup.
if (!isPost) {
  core.saveState('isPost', 'true')
}
