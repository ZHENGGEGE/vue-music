/**
 * Created by suzheng on 17/7/27.
 */

import {playMode} from 'common/js/config'

const state = {
  singer : {},
  playing : false,
  fullScreen : false,
  playList : [],
  sequenceList : [],
  mode : playMode.sequence,
  currentlyIndex : -1


}

export default state
