const program = [
  { time: '09:00', activity: "Échauffement léger" },
  { time: '10:00', activity: 'Pause étirements' },
  { time: '11:00', activity: '10 abdos' },
  { time: '14:00', activity: 'Marche rapide' },
  { time: '16:00', activity: '20 squats' },
];

function getDailyProgram() {
  return program;
}

module.exports = { getDailyProgram };
