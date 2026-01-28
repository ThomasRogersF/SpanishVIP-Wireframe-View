import { useNavigation } from '../hooks/useNavigation.js'
import GrammarGuidebook from '../components/Lesson/GrammarGuidebook.jsx'
import grammarGuides from '../data/grammarGuideData.js'

function GrammarGuidebookScreen() {
  const { showTravelLesson2Intro, showDashboard } = useNavigation()

  return (
    <GrammarGuidebook
      data={grammarGuides.modal_03_L2_mod_03}
      onComplete={showTravelLesson2Intro}
      onClose={showDashboard}
    />
  )
}

export default GrammarGuidebookScreen
