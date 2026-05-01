import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import SimulationPage from './pages/SimulationPage';
import OutcomeScreen from './pages/OutcomeScreen';
import RushPredictorPage from './pages/RushPredictorPage';
import ResourcesPage from './pages/ResourcesPage';
import LegislaturePage from './pages/LegislaturePage';
import LoginPage from './pages/LoginPage';
import Mitra from './components/Sahayak';
import type { RoleId, Choice, Scores } from './types/voteflow.types';

type AppScreen = 'login' | 'landing' | 'simulation' | 'outcome' | 'rush-predictor' | 'resources' | 'legislature';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function App() {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [finalChoices, setFinalChoices] = useState<Choice[]>([]);
  const [finalScores, setFinalScores] = useState<Scores>({ trust: 50, speed: 50, accuracy: 50 });

  const handleSelectRole = (role: RoleId) => {
    setSelectedRole(role);
    setScreen('simulation');
  };

  const handleOpenRushPredictor = () => {
    setScreen('rush-predictor');
  };

  const handleOpenResources = () => {
    setScreen('resources');
  };

  const handleOpenLegislature = () => {
    setScreen('legislature');
  };

  const handleComplete = (choices: Choice[], scores: Scores) => {
    setFinalChoices(choices);
    setFinalScores(scores);
    setScreen('outcome');
  };

  const handlePlayAgain = () => {
    setSelectedRole(null);
    setFinalChoices([]);
    setFinalScores({ trust: 50, speed: 50, accuracy: 50 });
    setScreen('landing');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return (
          <motion.div key="login" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LoginPage onLogin={() => setScreen('landing')} />
          </motion.div>
        );
      case 'legislature':
        return (
          <motion.div key="legislature" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LegislaturePage onBack={() => setScreen('landing')} />
          </motion.div>
        );
      case 'resources':
        return (
          <motion.div key="resources" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <ResourcesPage onBack={() => setScreen('landing')} />
          </motion.div>
        );
      case 'rush-predictor':
        return (
          <motion.div key="rush" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <RushPredictorPage onBack={() => setScreen('landing')} />
          </motion.div>
        );
      case 'simulation':
        if (!selectedRole) return null;
        return (
          <motion.div key="simulation" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <SimulationPage role={selectedRole} onComplete={handleComplete} onBack={() => setScreen('landing')} />
          </motion.div>
        );
      case 'outcome':
        if (!selectedRole) return null;
        return (
          <motion.div key="outcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <OutcomeScreen role={selectedRole} choices={finalChoices} scores={finalScores} onPlayAgain={handlePlayAgain} />
          </motion.div>
        );
      default:
        return (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
            <LandingPage 
              onSelectRole={handleSelectRole} 
              onOpenRushPredictor={handleOpenRushPredictor} 
              onOpenResources={handleOpenResources} 
              onOpenLegislature={handleOpenLegislature} 
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="bg-[#050D1A] min-h-screen">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
      
      {screen !== 'login' && (
        <Mitra 
          currentScreen={screen} 
          onNavigate={(s) => setScreen(s)} 
          onSelectRole={handleSelectRole}
        />
      )}
    </div>
  );
}

export default App;
