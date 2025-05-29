
// This would be replaced with an actual API call in a real application

export const generateStory = async (keywords: string[]): Promise<string> => {
  console.log('Generating story with keywords:', keywords);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Map of keyword to potential story elements
  const storyElements: Record<string, string[]> = {
    dragon: [
      "a fearsome dragon with emerald scales",
      "an ancient dragon guarding treasure",
      "a wise dragon who speaks in riddles"
    ],
    forest: [
      "a magical forest with glowing trees",
      "a dark forest shrouded in mist",
      "an enchanted forest filled with strange creatures"
    ],
    magic: [
      "powerful spells cascading through the air",
      "ancient magic awakening",
      "mysterious magical artifacts"
    ],
    castle: [
      "a towering castle with spires reaching the clouds",
      "an abandoned castle reclaimed by nature",
      "a castle hidden by powerful illusions"
    ],
    ocean: [
      "vast depths hiding ancient secrets",
      "crashing waves against towering cliffs",
      "a shimmering ocean under moonlight"
    ],
    wizard: [
      "a bearded wizard with twinkling eyes",
      "a young wizard learning their craft",
      "a mysterious wizard with unknown powers"
    ],
    space: [
      "distant planets with rings of ice",
      "a nebula swirling with new stars",
      "the void between worlds"
    ],
    astronaut: [
      "a lone astronaut drifting in space",
      "an astronaut discovering alien technology",
      "astronauts establishing the first lunar colony"
    ],
    treasure: [
      "chests overflowing with gold coins",
      "a legendary artifact of immense power",
      "treasure maps leading to forgotten places"
    ],
    fairy: [
      "tiny fairies with gossamer wings",
      "mischievous fairies playing tricks",
      "fairy royalty holding court in flower gardens"
    ],
    potion: [
      "bubbling potions in glass vials",
      "a potion that grants wishes with unexpected consequences",
      "ancient potion recipes written in cryptic language"
    ],
  };
  
  // Generate story opening based on keywords
  const openings = [
    "Once upon a time, in a land far away,",
    "In the distant future,",
    "Long ago, when magic still flowed freely through the world,",
    "In a realm where dreams and reality intertwined,",
    "Beyond the veil of ordinary perception,"
  ];
  
  const middles = [
    "our hero embarked on a journey that would change everything.",
    "the balance between chaos and order began to shift.",
    "an unexpected discovery set events in motion.",
    "ancient prophecies began to unfold in mysterious ways.",
    "two unlikely companions found their fates intertwined."
  ];
  
  // Pick a random opening and middle
  const opening = openings[Math.floor(Math.random() * openings.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  
  // Create story body based on keywords
  let storyBody = "";
  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    if (storyElements[lowerKeyword]) {
      // Pick a random element for this keyword
      const element = storyElements[lowerKeyword][Math.floor(Math.random() * storyElements[lowerKeyword].length)];
      storyBody += ` The tale involved ${element}.`;
    } else {
      // Generic handling for keywords we don't have specific elements for
      storyBody += ` The ${keyword} played a crucial role in what was to come.`;
    }
  }
  
  // Generate paragraphs
  const para1 = `${opening}${storyBody} ${middle}`;
  
  const para2 = `As days turned to weeks, challenges emerged that tested courage and resolve. Shadows lengthened across the land, while whispers of a power long forgotten began to circulate among the wise.`;
  
  const para3 = `Many believed the legends were merely stories to frighten children, but those who had witnessed the signs knew better. The time of reckoning was approaching, and only those who understood the true nature of ${keywords[0] || "magic"} could hope to withstand what was coming.`;
  
  const endings = [
    `And so our story begins, with fate's threads weaving together in ways no one could have foreseen.`,
    `This marked the beginning of an adventure that would become legend.`,
    `Little did they know that this was merely the first chapter in an epic that would span generations.`,
    `The journey ahead would be perilous, but necessary for the salvation of all.`,
    `In that moment, destiny was set in motion, changing everything forever.`
  ];
  
  const ending = endings[Math.floor(Math.random() * endings.length)];
  
  // Combine everything
  return `${para1}\n\n${para2}\n\n${para3}\n\n${ending}`;
};
