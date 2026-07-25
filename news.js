const newsBox = document.getElementById("news");

// Helper function to dynamically subtract days from today
const daysAgo = (days) => new Date(Date.now() - days * 86400000).toISOString();

// 30-Day Pre-Populated Archive (Plumbing Tips & Utility Guides)
const defaultArchive = [
  {
    title: "Seasonal Plumbing Tip: Summer Water Pressure & Line Inspection",
    description: "High municipal water demand during summer heat can impact household water pressure. Check exposed outdoor spigots and main shutoff valves for minor leaks.",
    link: "https://www.kcwater.us/",
    pubDate: daysAgo(0),
    source: "Very Good Plumber Care Team"
  },
  {
    title: "Kansas City & Adrian, MO Water Line Maintenance Reminders",
    description: "Homeowners in Johnson County, KCMO, and Adrian are responsible for the water service line from the meter to the house. Consider annual sewer scope inspections for older clay pipes.",
    link: "https://www.waterone.org/",
    pubDate: daysAgo(1),
    source: "Local Utility Guide"
  },
  {
    title: "Preventing Garbage Disposal & Drain Clogs During Summer Cookouts",
    description: "Avoid pouring cooking grease, stringy vegetables, or coffee grounds down kitchen drains. Always run cold water for 15 seconds after running the disposal.",
    link: "https://www.epa.gov/watersense",
    pubDate: daysAgo(2),
    source: "Plumbing Tips"
  },
  {
    title: "Understanding Local Water Hardness & Water Heater Flushing",
    description: "Tap water across western Missouri and eastern Kansas contains minerals that can create sediment buildup. Flush your water heater tank annually to maintain heating efficiency.",
    link: "https://www.kcwater.us/",
    pubDate: daysAgo(3),
    source: "Home Maintenance Guide"
  },
  {
    title: "Backflow Prevention & Outdoor Irrigation Safety",
    description: "Ensure backflow preventers on outdoor lawn sprinkler systems are tested annually to protect local drinking water supplies from cross-contamination.",
    link: "https://www.waterone.org/",
    pubDate: daysAgo(4),
    source: "Utility Compliance"
  },
  {
    title: "How to Locate and Test Your Main Water Shut-Off Valve",
    description: "Knowing how to quickly shut off your main water valve can prevent thousands of dollars in water damage during a major line burst or plumbing emergency.",
    link: "https://www.epa.gov/watersense",
    pubDate: daysAgo(5),
    source: "Emergency Plumbing Prep"
  },
  {
    title: "Checking Outdoor Hose Bibs and Foundation Drains",
    description: "Disconnect garden hoses during sudden temperature drops or severe storm surges to allow spigots to drain properly.",
    link: "https://www.kcwater.us/",
    pubDate: daysAgo(6),
    source: "Plumbing Tips"
  },
  {
    title: "Sewer Line Inspection Basics for Older Homes",
    description: "Tree root intrusion is the leading cause of main sewer line backups in older properties. Routine video pipe inspection identifies cracks before total blockages occur.",
    link: "https://www.waterone.org/",
    pubDate: daysAgo(8),
    source: "Plumbing Maintenance"
  },
  {
    title: "Managing Water Pressure Fluctuations in Rural & Suburban Lines",
    description: "Installing a Pressure Reducing Valve (PRV) can protect indoor fixtures and appliances from premature wear caused by high line pressure.",
    link: "https://www.epa.gov/watersense",
    pubDate: daysAgo(11),
    source: "System Care"
  },
  {
    title: "Detecting Hidden Plumbing Leaks Around Toilets & Faucets",
    description: "A silent toilet flapper leak can waste hundreds of gallons of water per day. Place a few drops of food coloring in the tank to test for slow leaks into the bowl.",
    link: "https://www.kcwater.us/",
    pubDate: daysAgo(15),
    source: "Water Conservation"
  },
  {
    title: "Understanding Main Line Valve Maintenance & Water Meter Access",
    description: "Keep vegetation cleared away from your outdoor water meter pit so utility workers and plumbers can quickly isolate supply lines during repairs.",
    link: "https://www.waterone.org/",
    pubDate: daysAgo(20),
    source: "Local Utility Guide"
  },
  {
    title: "Preventing Corrosion in Copper and Galvanized Steel Pipes",
    description: "Discolored water or metallic tastes can indicate internal pipe corrosion. Periodic water testing ensures domestic supply lines remain safe and clean.",
    link: "https://www.epa.gov/watersense",
    pubDate: daysAgo(25),
    source: "Pipe Integrity"
  },
  {
    title: "Monthly Plumbing Checklist: Drain Strains & P-Trap Care",
    description: "Run water regularly down guest bathroom sinks and basement drains to prevent sewer gases from drying out P-traps and entering living spaces.",
    link: "https://www.kcwater.us/",
    pubDate: daysAgo(29),
    source: "Homeowner Guide"
  }
];

function getDayLabel(dateObj) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateObj.toDateString() === today.toDateString()) {
    return "Today";
  } else if (dateObj.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
  }
}

async function getNews() {
  if (!newsBox) return;

  newsBox.innerHTML = "Loading local plumbing and water updates...";

  // 1. Retrieve stored articles from browser memory
  let savedArticles = [];
  try {
    savedArticles = JSON.parse(localStorage.getItem("plumbing_news_archive")) || [];
  } catch (e) {
    savedArticles = [];
  }

  // Seed with full 30-day default archive if memory is fresh
  if (savedArticles.length === 0) {
    savedArticles = defaultArchive;
  }

  // 2. Public Feeds (including search for Adrian, Missouri)
  const feeds = [
    "https://www.waterone.org/RSSFeed.aspx?ModID=58",
    "https://www.epa.gov/newsreleases/search/rss",
    "https://www.bing.com/news/search?q=%22Adrian+Missouri%22+OR+%22Adrian+MO%22+water+OR+sewer+OR+plumbing&format=rss"
  ];

  let fetchedArticles = [];

  for (let feed of feeds) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      let response = await fetch(
        "https://api.rss2json.com/v1/api.json?count=50&rss_url=" + encodeURIComponent(feed),
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);

      let data = await response.json();

      if (data && data.status === "ok" && data.items) {
        fetchedArticles = fetchedArticles.concat(data.items);
      }
    } catch (error) {
      console.warn("Feed timed out or failed:", feed);
    }
  }

  // 3. Filter for water, sewer, plumbing, and Adrian MO
  const keywords = ["water", "sewer", "plumb", "main", "pipe", "drain", "boil", "leak", "clean", "utility", "outage", "adrian"];
  let freshRelevant = [];

  fetchedArticles.forEach(article => {
    const textToSearch = (article.title + " " + (article.description || "")).toLowerCase();
    if (keywords.some(kw => textToSearch.includes(kw))) {
      freshRelevant.push({
        title: article.title,
        description: article.description,
        link: article.link,
        pubDate: article.pubDate,
        source: "Live Water Feed"
      });
    }
  });

  // 4. Combine new live entries + historical archive
  let combined = [...freshRelevant, ...savedArticles];

  // 5. Deduplicate by title
  let finalArticles = [];
  let seenTitles = new Set();

  combined.forEach(item => {
    if (!seenTitles.has(item.title)) {
      seenTitles.add(item.title);
      finalArticles.push(item);
    }
  });

  // 6. Sort newest to oldest
  finalArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  // Store up to 100 historical items (~30–60 days of archives)
  finalArticles = finalArticles.slice(0, 100);

  try {
    localStorage.setItem("plumbing_news_archive", JSON.stringify(finalArticles));
  } catch (e) {
    console.warn("Unable to save archive to localStorage:", e);
  }

  // 7. Group articles by day
  const groupedByDay = {};
  finalArticles.forEach(article => {
    const pubDate = new Date(article.pubDate);
    if (isNaN(pubDate)) return;

    const dayLabel = getDayLabel(pubDate);
    if (!groupedByDay[dayLabel]) {
      groupedByDay[dayLabel] = [];
    }
    groupedByDay[dayLabel].push(article);
  });

  // 8. Render to page with WaterOne Water Quality Link at top
  newsBox.innerHTML = `
    <div style="background: rgba(0, 170, 255, 0.15); border: 2px solid #00aaff; border-radius: 8px; padding: 15px; margin-bottom: 25px; text-align: center;">
      <h3 style="margin: 0 0 5px 0; color: #ffffff;">💧 Official Water Quality Reports</h3>
      <p style="margin: 0 0 10px 0; color: #e0e0e0; font-size: 0.95rem;">Looking for drinking water testing data or consumer confidence reports for WaterOne?</p>
      <a href="https://www.waterone.org/339/Water-Quality-Reports" target="_blank" rel="noopener noreferrer" style="color: #00aaff; font-weight: bold; text-decoration: underline;">
        View Official WaterOne Quality Report →
      </a>
    </div>
  `;

  const dayKeys = Object.keys(groupedByDay);

  dayKeys.forEach(day => {
    let dayHTML = `
      <div class="day-group" style="margin-bottom: 30px;">
        <h2 style="border-bottom: 2px solid #00aaff; padding-bottom: 5px; margin-bottom: 15px; color: #ffffff;">${day}</h2>`;

    groupedByDay[day].forEach(article => {
      const cleanDescription = article.description 
        ? article.description.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...'
        : "Local plumbing and water update.";

      dayHTML += `
        <div class="card" style="margin-bottom: 15px;">
          <h3>${article.title}</h3>
          <p>${cleanDescription}</p>
          <small>${new Date(article.pubDate).toLocaleDateString()} • ${article.source || "Plumbing Update"}</small>
          <br><br>
          <a href="${article.link}" target="_blank" rel="noopener noreferrer">
            Read Update →
          </a>
        </div>
      `;
    });

    dayHTML += `</div>`;
    newsBox.innerHTML += dayHTML;
  });
}

getNews();
setInterval(getNews, 43200000);