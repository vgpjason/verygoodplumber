// --- 1. WATER CANVAS ENGINE ---
const canvas = document.getElementById('vortexCanvas');
const ctx = canvas.getContext('2d', { alpha: true });

const blueShades = ["14, 116, 144", "14, 165, 233", "56, 189, 248", "186, 230, 253"];

let width, height, maxRadius, cx, cy, dpr = 1;
let flushSpeedMultiplier = 1;
let mainParticles = [];
let mistParticles = [];

const mainCount = 100;
const mistCount = 150;

function resize() {
    const parent = canvas.parentElement;
    const cssW = parent.clientWidth;
    const cssH = parent.clientHeight;

    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    width = cssW;
    height = cssH;
    cx = width / 2;
    cy = height / 2;
    maxRadius = Math.hypot(width, height) * 0.55;

    initParticles();
}

function initParticles() {
    mainParticles = Array.from({ length: mainCount }, (_, i) => ({
        angle: Math.random() * Math.PI * 2,
        radius: 20 + Math.random() * maxRadius,
        speed: 0.0015 + Math.random() * 0.0035,
        size: 30 + Math.random() * 25,
        color: blueShades[i % blueShades.length],
        opacity: 0.12 + Math.random() * 0.18
    }));

    mistParticles = Array.from({ length: mistCount }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * maxRadius,
        speed: 0.005 + Math.random() * 0.01,
        size: 2 + Math.random() * 6,
        opacity: 0.3 + Math.random() * 0.5
    }));
}

function drawCrispBubble(x, y, size, color, opacity) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, size);
    g.addColorStop(0, `rgba(${color}, ${opacity * 1.4})`);
    g.addColorStop(0.7, `rgba(${color}, ${opacity * 0.8})`);
    g.addColorStop(1, "transparent");

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    // Sharp Specular Glare Dot
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 1.8})`;
    ctx.beginPath();
    ctx.arc(x - size * 0.25, y - size * 0.25, size * 0.18, 0, Math.PI * 2);
    ctx.fill();
}

function animateWater() {
    // Trail fade effect
    ctx.fillStyle = "rgba(1, 8, 20, 0.28)";
    ctx.fillRect(0, 0, width, height);

    // 1. Main draining droplets with acceleration near center
    mainParticles.forEach(p => {
        const speedFactor = (1 + (1 - p.radius / maxRadius) * 2) * flushSpeedMultiplier;
        p.angle -= p.speed * speedFactor;
        p.radius -= 0.35 * speedFactor;

        if (p.radius < 5) p.radius = maxRadius;

        const x = cx + Math.cos(p.angle) * p.radius * 1.4;
        const y = cy + Math.sin(p.angle) * p.radius;

        const dynamicSize = p.size * (p.radius / maxRadius);
        drawCrispBubble(x, y, Math.max(3, dynamicSize), p.color, p.opacity);
    });

    // 2. Inward mist spray
    mistParticles.forEach(p => {
        p.angle -= p.speed * flushSpeedMultiplier;
        p.radius -= 0.7 * flushSpeedMultiplier;

        if (p.radius < 3) p.radius = maxRadius;

        const x = cx + Math.cos(p.angle) * p.radius * 1.4;
        const y = cy + Math.sin(p.angle) * p.radius;

        ctx.fillStyle = `rgba(224, 242, 254, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateWater);
}

window.addEventListener('resize', resize);
resize();
animateWater();



// --- International Plumbing Code — Random Code (changes on every page load) ---
// Longer plain-language paraphrases of common IPC requirements (not verbatim copyrighted code text).
const ipcCodes = [
    { code: 'IPC 301.1', title: 'Scope — General Regulations', summary: 'This section establishes that Chapter 3 applies to the general regulations governing materials, fittings, appliances, and the installation of plumbing systems. It sets the foundation for how pipes are selected, protected, supported, tested, and identified. Work that does not meet these baseline rules is not considered code-compliant, even if later chapters appear to be satisfied.' },
    { code: 'IPC 303.1', title: 'Identification of materials', summary: 'Each length of pipe, fitting, and fixture material must be marked by the manufacturer so the type, grade, and standard can be verified in the field. Inspectors and installers rely on these marks to confirm that only approved materials enter the system. Unmarked, rebranded, or unknown products are not acceptable substitutes and must be rejected before installation.' },
    { code: 'IPC 305.1', title: 'Protection of pipes and plumbing components', summary: 'Piping and related components must be protected from corrosion, impact, abrasion, and other damage that could cause leaks or structural failure. Where pipes pass through concrete, masonry, or corrosive soils, sleeves, coatings, wrap, or other approved protection is required. The goal is a system that remains sound for the life of the building under normal service conditions.' },
    { code: 'IPC 305.4', title: 'Freezing protection', summary: 'Water, soil, and waste pipes located in attics, crawl spaces, exterior walls, or other areas subject to freezing temperatures must be protected. Acceptable methods include burying pipe below the local frost line, routing through conditioned space, insulating, or using listed heat-trace systems. Frozen pipes that burst are a leading cause of water damage, so this requirement is strictly enforced in cold climates.' },
    { code: 'IPC 306.1', title: 'Trenching, excavation, and backfill', summary: 'Trenches for underground piping must provide a firm, uniform bed free of rocks and debris that could puncture or stress the pipe wall. Pipe must be supported along its full length; hanging across voids is not allowed. Backfill is placed in lifts and compacted so settlement does not shear joints or change grade. These rules apply to both water service and building sewer installations.' },
    { code: 'IPC 312.1', title: 'Required tests', summary: 'Before a plumbing system is approved for use, the drainage, vent, and water-supply piping must be tested for leaks. Testing proves that joints were made correctly and that the system can hold the prescribed pressure or water column. Rough-in tests are typically done before concealment; final tests may be required after fixtures are set. Failed tests must be corrected and retested.' },
    { code: 'IPC 312.3', title: 'Drainage and vent water test', summary: 'The drainage and vent system is filled with water so that every joint is under at least a 10-foot head of water. The water level is held while the inspector checks for drops that would indicate a leak. Air testing is sometimes permitted as an alternate method where water testing is impractical, but the pressure and duration still must meet the code. Defective joints are repaired before backfill or cover-up.' },
    { code: 'IPC 312.5', title: 'Water supply system test', summary: 'The potable water distribution system is pressurized above normal working pressure (or to the value specified in the adopted edition) and held while all joints and valves are examined. Any loss of pressure indicates a leak that must be found and fixed. Testing is done before fixtures are fully connected when possible, so repairs do not damage finished surfaces.' },
    { code: 'IPC 405.3', title: 'Location of fixtures', summary: 'Water closets, urinals, lavatories, and bidets must be placed so users can approach and use them safely and so maintenance access remains possible. Location also considers privacy, door swings, and the relationship to grab bars and clear floor space when accessibility standards apply. Poor layout that blocks doors or traps users is not acceptable.' },
    { code: 'IPC 405.3.1', title: 'Water closet and bidet clearance', summary: 'A minimum clear distance is required from the centerline of a water closet or bidet to any side wall, partition, or adjacent fixture. Additional clear space is required in front of the fixture for approach. These dimensions ensure the fixture is usable by a wide range of people and that a plumber can later service the supply and drain connections.' },
    { code: 'IPC 406.1', title: 'Automatic clothes washers', summary: 'Clothes washers must be listed and labeled for the installation and connected to the sanitary drainage system through a standpipe or other approved receptor. The standpipe must be trapped, vented as required, and high enough to prevent backflow into the machine. The water supply requires a shutoff valve and, where the local code demands it, backflow protection.' },
    { code: 'IPC 410.1', title: 'Drinking fountains', summary: 'Where the occupancy requires drinking fountains, each unit must be an approved fixture that dispenses potable water and is designed so the spout outlet is not easily contaminated. Bottle-filling stations are increasingly accepted as part of the required count when they meet the same sanitary standards. Placement must be accessible and not blocked by doors or equipment.' },
    { code: 'IPC 411.1', title: 'Emergency showers and eyewash stations', summary: 'In laboratories, industrial areas, and other spaces where corrosive or hazardous materials are handled, emergency showers and eyewash stations are required. They must deliver tepid water within a few seconds of activation, remain on without the user holding a valve, and be located on an unobstructed path from the hazard. Weekly activation checks are a common maintenance expectation.' },
    { code: 'IPC 412.1', title: 'Floor and trench drains', summary: 'Floor drains and trench drains are required in rooms where floors are routinely washed or where equipment can discharge large volumes of water—examples include public toilet rooms, commercial kitchens, and mechanical rooms. Each drain must be trapped, connected to the building drain, and sized so it can accept the expected flow without flooding the floor.' },
    { code: 'IPC 416.1', title: 'Lavatories', summary: 'Lavatories must be approved fixtures supported independently of the supply and waste piping. Public and employee restrooms often require a minimum number of lavatories based on occupancy. Water temperature at public hand-washing sinks is commonly limited to reduce scald risk, and accessibility clearances apply when the fixture is designated as accessible.' },
    { code: 'IPC 417.1', title: 'Showers', summary: 'Shower valves must be pressure-balanced, thermostatic, or combination type so sudden changes in supply pressure do not scald the user. The shower compartment or receptor must be waterproof, properly sloped to the drain, and large enough for safe use. Glass enclosures, when used, must meet safety-glazing requirements referenced by the building code.' },
    { code: 'IPC 417.3', title: 'Shower waste outlet', summary: 'Every shower must have a waste outlet fitted with a strainer and connected to a drain of adequate size for the fixture unit load. The outlet opening must be large enough that hair and small debris do not immediately clog the line. In gang showers, each station typically needs its own outlet unless the design is specifically approved otherwise.' },
    { code: 'IPC 419.1', title: 'Urinals', summary: 'Urinals must be approved and installed with the flush volume, mounting height, and clearances required by the code and any accessibility standards that apply. Water-conserving and waterless models are allowed when they are listed for the use and maintained so odors and sanitation problems do not develop. Carriers and supports must be adequate for the fixture weight and user load.' },
    { code: 'IPC 420.1', title: 'Water closets', summary: 'Water closets must be listed, securely fastened to the floor or wall carrier, and sealed to the closet flange with an approved wax ring or elastomer seal. Flush performance and maximum flush volume must meet the referenced standards. Elongated bowls and specific seat heights are often required in accessible toilet compartments.' },
    { code: 'IPC 421.1', title: 'Whirlpool bathtubs', summary: 'Whirlpool bathtubs must be installed so the pump, heater, and piping can be accessed for service without destroying finished surfaces. Suction fittings must be listed to reduce entrapment risk. The tub must drain completely, and the electrical components require GFCI protection under the electrical code.' },
    { code: 'IPC 424.1', title: 'Faucets and fixture fittings', summary: 'Faucets, supply stops, and related fittings must be approved for potable water and rated for the system pressure. Public lavatory faucets are often required to be metering or self-closing and to limit flow rate. Maximum delivery temperature limits protect users, especially children and the elderly, from scald burns.' },
    { code: 'IPC 501.1', title: 'Water heaters — Scope', summary: 'Chapter 5 governs the installation of storage and tankless water heaters, including location, seismic strapping where required, temperature and pressure relief, drain pans, combustion air for fuel-fired units, and connections to the water distribution system. Both residential and commercial heaters fall under these rules unless a specialized code applies.' },
    { code: 'IPC 501.2', title: 'Water heater used as a space heater', summary: 'A water heater that also supplies space heating must be listed for dual use. The heating loop must be arranged so it cannot contaminate the potable water, and the combined load must not exceed the heater’s rated capacity. Mixing valves or other controls are used to keep domestic hot water within a safe temperature range.' },
    { code: 'IPC 501.6', title: 'Water temperature control and mixing valves', summary: 'Hot water delivered to fixtures must be controlled so the temperature at the point of use does not create a scald hazard. Thermostatic mixing valves, temperature-limiting devices at the heater, or point-of-use mixing valves are typical solutions. Public hand-washing and bathing facilities usually have stricter maximum temperature limits than private residences.' },
    { code: 'IPC 502.1', title: 'Water heater installation', summary: 'Water heaters must be installed according to the manufacturer’s instructions and the code. Clearances to combustibles, access for service, proper venting of fuel-fired units, and a nearby drain or pan are common requirements. The heater must sit on a level, noncombustible base when required, and seismic straps are mandatory in many jurisdictions.' },
    { code: 'IPC 504.6', title: 'Requirements for discharge piping', summary: 'Piping from a temperature-and-pressure relief valve must be the full size of the valve outlet, made of approved material, and pitched to drain by gravity. The discharge end must terminate in a visible, safe location—typically within a few inches of the floor or into an approved receptor—and must not be threaded or capped in a way that could block flow. A blocked T&P line is a serious safety defect.' },
    { code: 'IPC 504.7', title: 'Required pan', summary: 'When a water heater is installed in an attic, above a finished ceiling, or in any location where leakage would damage the structure or contents, an approved drain pan is required under the unit. The pan must be drained by an indirect waste pipe to an approved point of disposal so a leak is carried away instead of soaking the building.' },
    { code: 'IPC 605.1', title: 'Water distribution pipe, tubing, and fittings', summary: 'Materials used inside the building for hot and cold water distribution must be listed for potable water and suitable for the temperature and pressure of the system. Common options include copper, CPVC, PEX, and galvanized steel where still permitted. Joining methods—solder, press, crimp, solvent cement—must match the material standard and be performed with the correct tools and procedures.' },
    { code: 'IPC 605.3', title: 'Water service pipe', summary: 'The water service pipe runs from the public main or private source to the building. It must be of approved underground material, sized for peak demand, and buried deep enough to avoid freezing and surface damage. A full-open valve is required near the entrance to the building so the entire interior system can be shut off for repairs.' },
    { code: 'IPC 605.4', title: 'Water distribution pipe', summary: 'Distribution piping within the building is sized from the code’s fixture-unit tables and available pressure so every fixture receives adequate flow. Piping must be supported at the intervals required for the material, protected from physical damage, and arranged to allow draining when the building is winterized or renovated.' },
    { code: 'IPC 606.1', title: 'Location of full-open valves', summary: 'Full-open valves (gate, ball, or butterfly) are required on the building water service, on the supply to each water heater, and at other points listed in the code. These valves allow large sections of the system to be isolated without restricting flow during normal operation. Valve locations must remain accessible after finishes are complete.' },
    { code: 'IPC 606.2', title: 'Location of shutoff valves', summary: 'Individual shutoff valves are required for fixtures, appliances, and equipment so a single item can be serviced or replaced without shutting water off to the entire building. Stops under sinks and toilets, and dedicated valves for dishwashers, ice makers, and water heaters, are everyday examples of this requirement.' },
    { code: 'IPC 607.1', title: 'Where required — Hot water', summary: 'Where the code or the intended use of the building requires hot water—bathing, washing, culinary work, or laundry—a hot water supply system must be installed. The system includes the heater, distribution piping, and any recirculation needed to deliver hot water within a reasonable time at distant fixtures.' },
    { code: 'IPC 607.2', title: 'Hot or tempered water supply to fixtures', summary: 'Fixtures that need hot or tempered water must be connected to the hot water distribution system. In public toilet rooms, tempered water for hand washing is often limited to a maximum temperature (commonly around 110°F in many adoptions) to protect children and others from scalding while still allowing effective washing.' },
    { code: 'IPC 608.1', title: 'General — Protection of potable water supply', summary: 'The potable water system must be protected from contamination caused by backflow, backsiphonage, and cross-connections with nonpotable sources. Every connection that could allow used or polluted water to reverse into the supply must have an approved means of protection—ranging from a simple air gap to a testable reduced-pressure principle assembly—matched to the degree of hazard.' },
    { code: 'IPC 608.14', title: 'Backflow protection', summary: 'The type of backflow preventer depends on whether the downstream hazard is low or high and whether continuous pressure is present. Atmospheric vacuum breakers, dual checks, pressure vacuum breakers, and reduced-pressure zone assemblies each have specific installation heights, orientation rules, and testing requirements. Devices must be accessible for annual testing where the code or local utility requires it.' },
    { code: 'IPC 608.16.4', title: 'Connections to automatic fire sprinkler systems', summary: 'When a fire sprinkler or standpipe system is fed from the potable water supply, backflow protection is required unless the fire system is constructed entirely of approved potable-water materials and contains no chemicals. The degree of hazard determines whether a double check or a reduced-pressure principle assembly is needed. Local fire and water departments often have additional rules.' },
    { code: 'IPC 701.1', title: 'Sanitary drainage — Scope', summary: 'Chapter 7 covers the design and installation of the sanitary drainage system that conveys wastes from fixtures to the building sewer or private sewage disposal system. It includes pipe materials, sizing by fixture units, slope, cleanouts, joints, and special arrangements such as sumps and ejectors. A properly designed drainage system flows freely under peak load without siphoning trap seals.' },
    { code: 'IPC 702.1', title: 'Above-ground sanitary drainage and vent pipe', summary: 'Above-ground drain and vent piping must be of materials approved for that use—commonly PVC, ABS, cast iron, or copper in certain applications. The material must resist the temperature and chemical character of the waste. Horizontal runs need hangers at the spacing required for the pipe type so sagging does not create belly traps that collect solids.' },
    { code: 'IPC 703.1', title: 'Building sewer pipe between building drain and public sewer', summary: 'The building sewer is the underground line from the building drain to the public sewer or private disposal system. It must be of approved buried material, laid on a firm bed at a continuous slope, and provided with cleanouts so blockages can be cleared. Joints must remain watertight under earth loads and groundwater pressure.' },
    { code: 'IPC 704.1', title: 'Slope of horizontal drainage piping', summary: 'Horizontal drainage piping is installed at a slope that produces a self-cleansing velocity—typically not less than 1/4 inch per foot for pipes 2-1/2 inches and smaller, and 1/8 inch per foot for larger pipes where the code allows. Too little slope allows solids to settle; too much slope can leave liquids behind and still create stoppages.' },
    { code: 'IPC 705.1', title: 'Joints between different drainage materials', summary: 'When dissimilar drainage materials meet—cast iron to plastic, clay to PVC, and so on—only listed transition fittings and methods may be used. Improvised couplings, concrete collars, or unlisted adapters are not acceptable because they often leak or pull apart as the ground moves or the materials expand at different rates.' },
    { code: 'IPC 706.1', title: 'Connections between drainage piping and fittings', summary: 'Drainage fittings must present a smooth interior path that does not obstruct flow. Sanitary tees, wyes, and long-sweep patterns are used according to whether the flow is horizontal-to-horizontal, vertical-to-horizontal, or horizontal-to-vertical. Restricted patterns such as heel-inlet fittings are limited or prohibited in many orientations.' },
    { code: 'IPC 708.1', title: 'Cleanouts required', summary: 'Cleanouts are required at the base of each vertical stack, near the junction of the building drain and building sewer, at changes of direction greater than 45 degrees, and at measured intervals along long horizontal runs. The cleanout opening must be at least as large as the pipe it serves (with common exceptions for larger pipes) and remain accessible without cutting finished surfaces.' },
    { code: 'IPC 709.1', title: 'Values for fixtures — Drainage fixture units', summary: 'Every fixture is assigned a drainage fixture unit (DFU) value that represents its intermittent load on the drainage system. Tables convert total DFU load into minimum pipe sizes for branches, stacks, and building drains. Using the correct DFU values is essential; under-counting leads to undersized pipes that surcharge during simultaneous use.' },
    { code: 'IPC 710.1', title: 'Maximum fixture unit load', summary: 'Each pipe size has a maximum DFU capacity for horizontal and vertical applications. When the connected load exceeds the table value, the pipe must be increased. Stacks also have limits on the number of fixture units that may discharge into a given branch interval so the stack does not overload and blow trap seals on lower floors.' },
    { code: 'IPC 712.1', title: 'Building subdrains', summary: 'When fixtures are located below the level of the building sewer, their waste must discharge into a sump or receiving tank and be lifted by a sewage ejector or pump to the gravity sewer. The ejector must be sized for the peak inflow, equipped with a check valve and full-open shutoff on the discharge, and vented according to the code so the pump chamber does not become pressurized.' },
    { code: 'IPC 801.1', title: 'Indirect and special waste — Scope', summary: 'Chapter 8 addresses wastes that must not connect directly to the sanitary drainage system. Examples include certain food-preparation sinks, dishwashing machines in commercial kitchens, sterilizers, and clear-water condensate. These wastes discharge through an air gap or air break into a receptor so a backup in the sewer cannot contaminate the equipment or food-contact surfaces.' },
    { code: 'IPC 802.1', title: 'Where required — Indirect waste', summary: 'An indirect waste connection is required for fixtures and appliances where a direct connection would create a health hazard if the drain backed up. The air gap must be at least twice the effective opening of the discharge pipe, and the receptor must be trapped and vented as a plumbing fixture. Floor sinks and hub drains are common receptors in commercial work.' },
    { code: 'IPC 803.1', title: 'Waste water temperature', summary: 'Waste discharged into the drainage system must not exceed the temperature limit set by the code (often 140°F) unless the piping materials and the downstream treatment plant are specifically designed for higher temperatures. Commercial dishwashers and process equipment may need a cooling method—such as a tempering tank or heat exchanger—before the waste enters the building drain.' },
    { code: 'IPC 901.1', title: 'Vents — Scope', summary: 'Chapter 9 covers the venting of the drainage system. Vents admit air so wastes can flow without siphoning trap seals, and they allow sewer gases to escape outdoors instead of into the building. Every trap must be protected by a vent within the developed-distance limits of the code, unless an engineered or special venting method is used.' },
    { code: 'IPC 903.1', title: 'Stack required', summary: 'A vent stack or a stack vent extending to the outdoors is required for most multi-story and larger single-story drainage systems. The stack provides a continuous air path that equalizes pressure throughout the system. Branch vents alone cannot always handle the air demand when many fixtures discharge at once.' },
    { code: 'IPC 904.1', title: 'Required vent extension', summary: 'Each vent terminal must extend through the roof (or to an approved location) and terminate at the height and horizontal clearances from windows, doors, air intakes, and property lines required by the code. A terminal that is too close to an opening can allow sewer gas into occupied spaces; one that is too short can be blocked by snow or debris.' },
    { code: 'IPC 905.1', title: 'Vent connections and grades', summary: 'Vent pipes must be free of sags and traps that could collect water and block the air path. They are graded to drain back to the drainage system by gravity. Connections to horizontal drainage pipes are made above the flood-level rim of the highest fixture served where the code requires a dry vent, keeping the vent opening out of the waste stream.' },
    { code: 'IPC 906.1', title: 'Size of individual vents', summary: 'An individual vent must be at least as large as the required size of the drain it serves, with a practical minimum (commonly 1-1/4 inches). When the vent is unusually long or has many fittings, the size may need to be increased so friction does not prevent adequate air flow. Undersized vents are a frequent cause of gurgling traps and sewer odors.' },
    { code: 'IPC 908.1', title: 'Circuit venting', summary: 'Circuit venting allows a single vent to serve a battery of floor-outlet fixtures on one horizontal branch, within limits on the number of fixtures, the size of the drain, and the distance to the vent connection. It reduces the number of vent penetrations through the roof while still protecting every trap seal when the design rules are followed exactly.' },
    { code: 'IPC 909.1', title: 'Island fixture venting', summary: 'Fixtures in kitchen islands and similar peninsula locations often cannot take a conventional vertical vent through the cabinet. The code permits a special island-vent fitting and loop arrangement that rises above the flood-level rim before connecting to a vertical vent stack. The installation must still keep the trap seal intact under normal use.' },
    { code: 'IPC 912.1', title: 'Horizontal wet venting', summary: 'Horizontal wet venting uses the drain from one or more lavatories, bathtubs, or showers as a wet vent for a water closet or other fixture on the same branch. Strict limits apply to fixture count, pipe size, and configuration. When installed correctly, it saves space and materials; when installed incorrectly, trap seals on the wet-vented fixtures can fail.' },
    { code: 'IPC 1002.1', title: 'Fixture traps — Requirement for traps', summary: 'Every plumbing fixture that discharges to the drainage system must be equipped with a trap that maintains a water seal. The seal blocks sewer gas from entering the room. Combination fixtures may share a single trap only when the code specifically allows it; otherwise each fixture needs its own trap and, usually, its own vent protection.' },
    { code: 'IPC 1002.4', title: 'Trap seals', summary: 'The depth of a trap seal is regulated so it is deep enough to resist evaporation and minor pressure fluctuations, but not so deep that solids accumulate and the fixture drains slowly. Trap seals must be protected from siphonage, back pressure, and excessive evaporation. In rarely used fixtures, trap primers or other means may be required to keep the seal charged.' },
    { code: 'IPC 1003.1', title: 'Where required — Interceptors and separators', summary: 'Interceptors and separators are required wherever oil, grease, sand, grit, or other materials that harm the drainage system or the treatment plant could be discharged. The device must be sized for the connected load, located so it can be maintained, and equipped with access covers that allow complete cleaning. Neglecting interceptor maintenance is a common cause of downstream blockages and violations.' },
    { code: 'IPC 1003.3', title: 'Grease interceptors', summary: 'Food-service establishments and other grease-producing operations must install a grease interceptor sized according to the code or the local utility’s formula. Gravity interceptors are typically outdoors and large; hydromechanical units may be indoors when listed for the flow rate. In either case, the interceptor must be pumped and cleaned on a schedule that prevents grease from passing through to the sewer.' },
    { code: 'IPC 1101.1', title: 'Storm drainage — Scope', summary: 'Chapter 11 regulates the collection and disposal of storm water from roofs, courtyards, areaways, and other areas so rainwater does not flood the building or overload the sanitary sewer. Storm systems are kept separate from sanitary drainage except where a combined sewer is expressly allowed by the authority having jurisdiction.' },
    { code: 'IPC 1101.2', title: 'Disposal of storm water', summary: 'Storm water must be discharged to an approved location such as a public storm sewer, a combined sewer where permitted, or an on-site system that does not damage adjacent property or foundations. Direct discharge onto sidewalks or neighboring lots in a way that creates a nuisance is not allowed. Local storm-water ordinances may add detention or water-quality requirements.' },
    { code: 'IPC 1106.1', title: 'Size of vertical conductors and leaders', summary: 'Roof drains, vertical conductors, and leaders are sized from rainfall-rate maps and the tributary roof area. An undersized leader will cause water to pond on the roof or overflow into the building at scuppers and edges. Horizontal storm drains are sized similarly, with additional attention to slope and available head.' },
    { code: 'IPC 1108.1', title: 'Secondary (emergency) roof drains', summary: 'Where primary roof drains can become blocked by debris or ice, secondary (overflow) drains or scuppers are required. The secondary system must be independent of the primary drains and should discharge in a conspicuous location—often above a window or doorway—so building occupants notice that the primary system needs attention before structural overload occurs.' },
    { code: 'IPC 1201.1', title: 'Special piping and storage systems — Scope', summary: 'Chapter 12 covers special piping systems such as nonflammable medical gas, oxygen, and vacuum systems that have requirements beyond ordinary water and drainage piping. Materials, labeling, cleanliness, and installation methods are tightly controlled because failures can directly affect patient safety in healthcare facilities.' },
    { code: 'IPC 1301.1', title: 'Nonpotable water systems — Scope', summary: 'Chapter 13 regulates nonpotable water systems—including gray water, reclaimed water, and rainwater harvesting—so they cannot be mistaken for or cross-connected to the potable supply. Piping must be marked, colored, or labeled; outlets must be identified; and backflow protection is required at any interface with the potable system.' },
    { code: 'IPC 1302.1', title: 'On-site nonpotable water reuse systems', summary: 'On-site reuse systems collect, treat, store, and distribute nonpotable water for approved uses such as toilet flushing or irrigation. Storage tanks need access for cleaning, overflow protection, and screening. The distribution network must remain completely separate from potable piping, and signs must warn that the water is not safe to drink.' },
    { code: 'IPC 1401.1', title: 'Subsurface landscape irrigation systems — Scope', summary: 'Subsurface landscape irrigation systems that apply nonpotable water must be designed so effluent does not surface, pond, or migrate to potable wells and streams. Setbacks from property lines, buildings, and water sources; soil evaluation; and dosing controls are part of a compliant design. Surface irrigation with untreated gray water is restricted or prohibited in many jurisdictions.' }
];

function showRandomIpcCode() {
    const pick = ipcCodes[Math.floor(Math.random() * ipcCodes.length)];
    const numEl = document.getElementById('ipcCodeNum');
    const titleEl = document.getElementById('ipcCodeTitle');
    const sumEl = document.getElementById('ipcCodeSummary');
    const linkEl = document.getElementById('ipcCodeLink');
    if (numEl) numEl.textContent = pick.code;
    if (titleEl) titleEl.textContent = pick.title;
    if (sumEl) sumEl.textContent = pick.summary || '';
    if (linkEl) {
        // Link to a search for this specific IPC section (public reference)
        const q = encodeURIComponent('"' + pick.code + '" "International Plumbing Code"');
        linkEl.href = 'https://www.google.com/search?q=' + q;
        linkEl.setAttribute('aria-label', 'Look up ' + pick.code + ' in the International Plumbing Code');
    }
}

// --- 2. CATEGORIES & REAL RSS NEWS ENGINE ---
const categories = [
    { 
        id: 'ancient', 
        name: '🏺 Ancient Plumbing News', 
        rssUrl: 'https://news.google.com/rss/search?q=%22ancient+plumbing%22+OR+%22Roman+aqueduct%22+OR+%22Roman+plumbing%22+OR+%22Indus+Valley+plumbing%22+OR+%22history+of+plumbing%22+OR+%22clay+pipe%22+ancient+OR+%22lead+pipe%22+Roman+OR+aqueduct+(archaeology+OR+history+OR+museum)&hl=en-US&gl=US&ceid=US:en',
        fallback: [
            {
                title: "Roman aqueducts: engineering that still shapes modern water supply",
                author: "History of Plumbing",
                pubDate: "2026-04-01T12:00:00Z",
                link: "https://en.wikipedia.org/wiki/Aqueduct_(water_supply)",
                description: "Roman aqueducts moved water for miles with precise grade and stone channels. Many principles—gravity flow, settling basins, and distribution networks—still inform how cities design water systems today.",
                image: null
            },
            {
                title: "Cloaca Maxima: Rome’s great sewer and the birth of urban drainage",
                author: "Archaeology & Infrastructure",
                pubDate: "2026-03-10T12:00:00Z",
                link: "https://en.wikipedia.org/wiki/Cloaca_Maxima",
                description: "The Cloaca Maxima drained the Roman Forum and surrounding districts. It is one of the earliest large-scale urban sewer works and a reminder that public health has always depended on moving waste away from living areas.",
                image: null
            },
            {
                title: "Indus Valley cities: standardized drains and household connections",
                author: "Ancient Urban Studies",
                pubDate: "2026-02-15T12:00:00Z",
                link: "https://en.wikipedia.org/wiki/Sanitation_of_the_Indus_Valley_Civilisation",
                description: "Harappa and Mohenjo-daro featured brick-lined drains, latrines, and covered sewers—evidence of planned sanitation thousands of years before modern plumbing codes.",
                image: null
            },
            {
                title: "Lead pipes (fistulae) in Roman plumbing — material lessons for today",
                author: "Materials History",
                pubDate: "2026-01-20T12:00:00Z",
                link: "https://en.wikipedia.org/wiki/Lead_pipe",
                description: "Romans used lead for flexible water service lines. Modern codes ban lead in potable systems, but the archaeological record shows how material choice and water chemistry have always affected public health.",
                image: null
            },
            {
                title: "Greek and Roman baths: water heating, delivery, and waste",
                author: "Classical Engineering",
                pubDate: "2025-12-05T12:00:00Z",
                link: "https://en.wikipedia.org/wiki/Thermae",
                description: "Public baths required continuous supply, heating (hypocausts), and drainage. They were early large-demand ‘customers’ of municipal water systems—ancestors of today’s commercial hot-water loads.",
                image: null
            },
            {
                title: "From clay pipe to cast iron: how buried drains evolved",
                author: "Plumbing Heritage",
                pubDate: "2025-11-01T12:00:00Z",
                link: "https://en.wikipedia.org/wiki/History_of_water_supply_and_sanitation",
                description: "Ancient builders used clay, stone, and wood; later cities adopted cast iron and eventually plastic. The problem never changed: keep supply clean and waste moving downhill without contaminating either.",
                image: null
            }
        ]
    },
    { 
        id: 'statewh', 
        name: '🔥 State Water Heaters', 
        rssUrl: 'https://news.google.com/rss/search?q=%22State+Water+Heaters%22+OR+%22State+water+heater%22+OR+%22State+Industries%22+(water+heater+OR+product+OR+launch+OR+hybrid+OR+heat+pump+OR+tankless+OR+commercial+OR+residential)&hl=en-US&gl=US&ceid=US:en',
        fallback: [
            {
                title: "State Water Heaters expands residential and commercial tank lineup",
                author: "State Water Heaters",
                pubDate: "2026-03-15T12:00:00Z",
                link: "https://www.statewaterheaters.com/",
                description: "State continues to supply gas and electric storage water heaters for residential replacements and light commercial jobs, with standard and high-efficiency models used daily by plumbing contractors.",
                image: null
            },
            {
                title: "State Premier® and ProLine® water heaters for everyday installs",
                author: "State Water Heaters",
                pubDate: "2026-02-01T12:00:00Z",
                link: "https://www.statewaterheaters.com/",
                description: "Contractors rely on State Premier and ProLine series for reliable tank water heaters — atmospheric, power-vent, and high-efficiency options sized for typical home demand.",
                image: null
            },
            {
                title: "State heat pump and hybrid water heater options for efficiency upgrades",
                author: "Industry News",
                pubDate: "2026-01-20T12:00:00Z",
                link: "https://www.statewaterheaters.com/",
                description: "Heat pump and hybrid units under the State brand help homeowners cut energy use on water heating while meeting modern efficiency expectations on retrofit and new construction jobs.",
                image: null
            },
            {
                title: "State commercial water heaters for multi-family and light commercial",
                author: "State Water Heaters",
                pubDate: "2025-11-10T12:00:00Z",
                link: "https://www.statewaterheaters.com/",
                description: "Larger State commercial tanks and systems support apartments, restaurants, and small commercial buildings where continuous hot water demand exceeds residential equipment capacity.",
                image: null
            },
            {
                title: "Selecting the right State water heater for Johnson County homes",
                author: "Very Good Plumber",
                pubDate: "2026-06-01T12:00:00Z",
                link: "https://verygoodplumber.com",
                description: "From standard 40- and 50-gallon gas tanks to power-vent and hybrid models, State units are a common choice for replacements across Overland Park, Olathe, Shawnee, and Lenexa when matched to venting, gas line, and recovery needs.",
                image: null
            }
        ]
    },
    { 
        id: 'waterheaters', 
        name: '🔥 Bradford White Water Heaters', 
        rssUrl: 'https://news.google.com/rss/search?q=%22Bradford+White%22+(water+heater+OR+product+OR+launch+OR+AeroTherm+OR+workforce+OR+training+OR+education+OR+trades+OR+PHCC+OR+%22skilled+trades%22)&hl=en-US&gl=US&ceid=US:en',
        fallback: [
            {
                title: "Bradford White launches AeroTherm® Series G2 hybrid water heaters",
                author: "Bradford White",
                pubDate: "2026-01-15T12:00:00Z",
                link: "https://forthepro.bradfordwhite.com/newsroom/",
                description: "Bradford White introduces the AeroTherm Series G2, featuring hybrid heat-pump technology and advanced energy efficiency for residential applications.",
                image: null
            },
            {
                title: "Bradford White strengthens skilled trades education through PHCC support & product donations",
                author: "PR Newswire / Bradford White",
                pubDate: "2026-06-10T12:00:00Z",
                link: "https://www.phccweb.org/news/bradford-white-strengthens-skilled-trades-education-through-phcc-support-product-donations/",
                description: "Bradford White invests in workforce development with product donations to training facilities and continued support for PHCC skilled-trades education programs.",
                image: null
            },
            {
                title: "Bradford White sparks interest in skilled trades with new children's book",
                author: "PR Newswire / Bradford White",
                pubDate: "2026-05-01T12:00:00Z",
                link: "https://www.prnewswire.com/news-releases/bradford-white-sparks-interest-in-skilled-trades-with-new-childrens-book-302462000.html",
                description: "The manufacturer launches an educational children's book aimed at introducing young readers to careers in plumbing and the skilled trades.",
                image: null
            },
            {
                title: "Bradford White Corporation named 2025 Employer of the Year by West Michigan Works!",
                author: "PR Newswire / Bradford White",
                pubDate: "2025-12-10T12:00:00Z",
                link: "https://www.prnewswire.com/news-releases/bradford-white-corporation-named-2025-employer-of-the-year-by-west-michigan-works-302637155.html",
                description: "Recognition for Bradford White's commitment to workforce development solutions, particularly in the industrial and manufacturing sector.",
                image: null
            },
            {
                title: "Bradford White supports workforce development at Barry County Career Fest",
                author: "PR Newswire / Bradford White",
                pubDate: "2026-02-12T12:00:00Z",
                link: "https://www.prnewswire.com/news-releases/bradford-white-water-heaters-supports-workforce-development-at-barry-county-career-fest-302685395.html",
                description: "Bradford White sponsors Explore The Trades presentations highlighting career opportunities in plumbing and HVAC for local students.",
                image: null
            },
            {
                title: "Bradford White launches eF Series Turbo commercial water heater",
                author: "Bradford White Corporation",
                pubDate: "2026-01-19T12:00:00Z",
                link: "https://www.bradfordwhitecorporation.com/category/newsroom/",
                description: "New commercial water heater expands Bradford White's eF Series lineup with turbo performance designed for high-demand commercial applications.",
                image: null
            },
            {
                title: "Bradford White renews partnership with Explore The Trades",
                author: "Plumbing Perspective",
                pubDate: "2025-10-29T12:00:00Z",
                link: "https://plumbingperspective.com/bradford-white-corporation-announces-partnership-with-explore-the-trades/",
                description: "Ongoing grant support helps expand Explore The Trades programs that introduce students to plumbing, HVAC, and other skilled-trade careers.",
                image: null
            }
        ]
    },
    { 
        id: 'toilets', 
        name: '🚽 Moen & Delta Faucets', 
        rssUrl: 'https://news.google.com/rss/search?q=Moen+(faucet+OR+shower+OR+Magnetix+OR+Smyth+OR+%22new+product%22+OR+launch)+OR+%22Delta+Faucet%22+(product+OR+launch+OR+faucet+OR+shower+OR+collection)&hl=en-US&gl=US&ceid=US:en',
        fallback: [
            {
                title: "Moen introduces the Magnetix™ Plus Showerhead collection",
                author: "Moen Press Room",
                pubDate: "2026-02-17T12:00:00Z",
                link: "https://www.moen.com/press-room/press-releases/2026feb_magnetix_plus_showerheads/",
                description: "An evolution of Moen's popular Magnetix technology, Magnetix Plus brings greater comfort, coverage options, and magnetic docking performance to the shower.",
                image: null
            },
            {
                title: "Moen launches the Magnetix™ Plus 2-in-1 Showerhead",
                author: "Moen Press Room",
                pubDate: "2026-02-17T13:00:00Z",
                link: "https://www.moen.com/press-room/press-releases/Feb2026_MagnetixPlus_2in1/",
                description: "New 2-in-1 design combines full-coverage spray with handheld versatility and effortless magnetic docking for everyday convenience.",
                image: null
            },
            {
                title: "Moen introduces the Smyth™ Bathroom Suite",
                author: "Moen Press Room",
                pubDate: "2026-02-17T14:00:00Z",
                link: "https://www.moen.com/press-room/press-releases/Feb2026_Smyth_bathroom_suite/",
                description: "Complete collection of bathroom faucets, shower fixtures, tub fillers, and accessories in six finishes — blending tailored elegance with vintage-inspired charm.",
                image: null
            },
            {
                title: "Moen introduces SwivelControl™ Wand Technology for kitchen faucets",
                author: "Moen Press Room",
                pubDate: "2026-02-17T15:00:00Z",
                link: "https://www.moen.com/press-room/",
                description: "SwivelControl wand delivers water precisely where you want it with enhanced cleaning power and full sink coverage for residential kitchens.",
                image: null
            },
            {
                title: "Moen launches “Must Be A Moen” brand campaign",
                author: "Supply House Times",
                pubDate: "2026-04-23T12:00:00Z",
                link: "https://www.supplyht.com/articles/107185-moen-launches-must-be-a-moen",
                description: "National campaign positions Moen as the trusted name for reliable water delivery across broadcast, digital, social, retail, and trade channels.",
                image: null
            },
            {
                title: "Delta Faucet: Touch2O® and TempAssure® innovations for modern baths",
                author: "Delta Faucet",
                pubDate: "2026-01-20T12:00:00Z",
                link: "https://www.deltafaucet.com/",
                description: "Delta continues to expand touch-activated faucets and thermostatic shower technology designed for comfort, water efficiency, and everyday reliability.",
                image: null
            },
            {
                title: "Delta Faucet multi-function shower systems and kitchen pull-downs",
                author: "Delta Faucet",
                pubDate: "2026-03-01T12:00:00Z",
                link: "https://www.deltafaucet.com/bath/showers.html",
                description: "Highlights from Delta's current shower and kitchen lines — pressure-balance valves, H2Okinetic spray patterns, and commercial-grade pull-down sprayers for residential installs.",
                image: null
            }
        ]
    },
    { 
        id: 'faucets', 
        name: '🚰 Local Supply Houses', 
        rssUrl: 'https://news.google.com/rss/search?q=%22Reeves-Wiedeman%22+OR+%22Reeves+Wiedeman%22+OR+RWCO+OR+%22Neenan+Company%22+OR+%22Neenan+Plumbing%22+OR+%22Pyramid+Pipe%22+OR+%22Pyramid+Pipe+%26+Supply%22+(plumbing+OR+supply)&hl=en-US&gl=US&ceid=US:en',
        fallback: [
            {
                title: "Reeves-Wiedeman Company (RWCO): Family-owned plumbing wholesale since 1887",
                author: "Reeves-Wiedeman / RWCO",
                pubDate: "2026-07-01T12:00:00Z",
                link: "https://rwco.com/",
                description: "Kansas City–based Reeves-Wiedeman serves contractors across Kansas and Missouri with pipe, valves, fittings, and fixtures from 20+ branch locations — including Olathe and Lenexa for Johnson County pros.",
                image: null
            },
            {
                title: "RWCO Olathe branch supports Johnson County plumbing contractors",
                author: "Reeves-Wiedeman",
                pubDate: "2026-06-15T12:00:00Z",
                link: "https://rwco.com/locations/",
                description: "The Olathe location at 19952 West 162nd Street (913-829-9090) stocks residential and commercial plumbing supplies with same-day pickup and delivery options for JoCo jobsites.",
                image: null
            },
            {
                title: "Neenan Company: Quality plumbing products, family-owned for 70+ years",
                author: "Neenan Company",
                pubDate: "2026-07-01T12:00:00Z",
                link: "https://neenanco.com/",
                description: "Based in Kansas City with 11 locations across Kansas and Missouri. Major lines include Bradford White, Delta, Moen, Kohler, Gerber, Elkay, and a full range of pipe, pumps, and fixtures.",
                image: null
            },
            {
                title: "Neenan Showrooms — fixture selection for Johnson County remodels",
                author: "Neenan Company",
                pubDate: "2026-05-20T12:00:00Z",
                link: "https://www.neenanshowroom.com/",
                description: "Trained staff help homeowners and builders select faucets, sinks, tubs, and bath suites. Leawood and Liberty showrooms serve the greater Kansas City and Johnson County market.",
                image: null
            },
            {
                title: "Pyramid Pipe & Supply — Kansas City plumbing wholesale",
                author: "Local Supply Spotlight",
                pubDate: "2026-06-01T12:00:00Z",
                link: "https://www.yelp.com/search?find_desc=Plumbing+Supply+Store&find_loc=Kansas+City%2C+MO",
                description: "Pyramid Pipe & Supply is a trusted local wholesale source for pipe, fittings, and plumbing materials serving contractors throughout the Kansas City metro.",
                image: null
            },
            {
                title: "Local supply partners for Johnson County Master Plumbers",
                author: "Very Good Plumber",
                pubDate: "2026-07-15T12:00:00Z",
                link: "https://verygoodplumber.com",
                description: "Working with Reeves-Wiedeman, Neenan, and Pyramid Pipe keeps parts available fast for water heater swaps, re-pipes, fixture upgrades, and emergency service calls across Overland Park, Olathe, Shawnee, and Lenexa.",
                image: null
            }
        ]
    },
    { 
        id: 'waterquality', 
        name: '💧 Water Filtration & Treatment', 
        rssUrl: 'https://www.pmmag.com/rss/topic/2657-water-treatment',
        fallback: []
    }
];

let activeCategory = categories[0];
let allArticles = [];

function triggerFlushAnimation() {
    const overlay = document.getElementById('flushOverlay');
    overlay.classList.add('flushing');
    flushSpeedMultiplier = 8; 

    setTimeout(() => {
        fetchNews(activeCategory);
        overlay.classList.remove('flushing');
        flushSpeedMultiplier = 1;
    }, 1000);
}

function switchPage(page) {
    const newsSec = document.getElementById('pageNews');
    const aboutSec = document.getElementById('pageAbout');
    const inflowSec = document.getElementById('pageInflow');
    const navNewsBtn = document.getElementById('navNewsBtn');
    const navAboutBtn = document.getElementById('navAboutBtn');
    const navInflowBtn = document.getElementById('navInflowBtn');

    const inactive = 'px-5 py-1.5 rounded-md text-xs font-semibold transition text-slate-300 hover:text-white';
    const active = 'px-5 py-1.5 rounded-md text-xs font-semibold transition bg-[#0084C8] text-white shadow';

    newsSec.classList.add('hidden');
    aboutSec.classList.add('hidden');
    inflowSec.classList.add('hidden');
    navNewsBtn.className = inactive;
    navAboutBtn.className = inactive;
    navInflowBtn.className = inactive;

    if (page === 'about') {
        aboutSec.classList.remove('hidden');
        navAboutBtn.className = active;
    } else if (page === 'inflow') {
        inflowSec.classList.remove('hidden');
        navInflowBtn.className = active;
    } else {
        newsSec.classList.remove('hidden');
        navNewsBtn.className = active;
    }
}

function extractImageFromItem(item) {
    // Prefer real enclosure images only (no fake placeholders)
    if (item.enclosure) {
        const enc = item.enclosure;
        const link = enc.link || enc.url || '';
        const type = (enc.type || '').toLowerCase();
        if (link && (type.startsWith('image/') || /\.(jpe?g|png|webp|gif|avif)(\?|$)/i.test(link))) {
            return link;
        }
    }
    if (item.thumbnail && String(item.thumbnail).startsWith('http') && !/placeholder|default|no[-_]?image/i.test(item.thumbnail)) {
        return item.thumbnail;
    }
    // Try first <img src> inside description HTML if present
    if (item.description && /<img/i.test(item.description)) {
        const m = String(item.description).match(/<img[^>]+src=["']([^"']+)["']/i);
        if (m && m[1] && m[1].startsWith('http')) return m[1];
    }
    return null;
}

function cleanDescription(html) {
    if (!html) return '';
    let t = String(html).replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    if (t.length > 200) t = t.substring(0, 200) + '...';
    return t;
}

async function fetchNews(category) {
    const newsGrid = document.getElementById('newsGrid');
    const currentCategoryTitle = document.getElementById('currentCategoryTitle');
    const articleCount = document.getElementById('articleCount');

    newsGrid.innerHTML = '';
    currentCategoryTitle.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-[#0084C8]"></span> ${category.name}`;
    articleCount.innerText = 'Loading real news…';

    // Show fallback immediately if any, then upgrade when live feed arrives
    allArticles = (category.fallback && category.fallback.length) ? category.fallback.slice() : [];
    if (allArticles.length) renderArticles(allArticles);

    const tryFetch = async (apiBase) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        const apiUrl = `${apiBase}?rss_url=${encodeURIComponent(category.rssUrl)}`;
        const res = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (!data || data.status !== 'ok' || !Array.isArray(data.items) || data.items.length === 0) {
            throw new Error('Empty or invalid feed');
        }
        return data.items.map((item) => {
            const image = extractImageFromItem(item);
            return {
                title: item.title || 'Untitled',
                author: (item.author || '').replace(/.*\(([^)]+)\).*/, '$1').trim() || category.name.replace(/^[^\w]+/, '').trim() || 'Plumbing News',
                pubDate: item.pubDate || new Date().toISOString(),
                link: item.link || '#',
                description: cleanDescription(item.description),
                image: image
            };
        }).filter(a => a.title && a.title.length > 3);
    };

    // Primary: rss2json (no count param — count requires paid key)
    // Fallback: alternate endpoint path sometimes used by the same service
    const endpoints = [
        'https://api.rss2json.com/v1/api.json',
        'https://rss2json.com/api.json'
    ];

    let liveArticles = null;
    for (const ep of endpoints) {
        try {
            liveArticles = await tryFetch(ep);
            if (liveArticles && liveArticles.length >= 2) break;
        } catch (err) {
            console.log('Feed attempt failed via', ep, err.message || err);
        }
    }

    if (liveArticles && liveArticles.length >= 2) {
        allArticles = liveArticles;
        const searchVal = (document.getElementById('searchInput') || {}).value || '';
        if (!searchVal.trim()) {
            renderArticles(allArticles);
        }
    } else if (!allArticles.length) {
        articleCount.innerText = 'Unable to load live feed right now — try again shortly';
        newsGrid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">
            Live news feed is temporarily unavailable. Click <strong>Flush the News</strong> to retry, or check back soon.
        </div>`;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderArticles(articles) {
    const newsGrid = document.getElementById('newsGrid');
    const articleCount = document.getElementById('articleCount');
    newsGrid.innerHTML = '';

    const list = Array.isArray(articles) ? articles : [];
    articleCount.innerText = `${list.length} article${list.length === 1 ? '' : 's'} available`;

    if (list.length === 0) {
        newsGrid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">No articles matching your search criteria.</div>`;
        return;
    }

    list.forEach((item, index) => {
        let date = 'Recent';
        try {
            const d = new Date(item.pubDate);
            if (!isNaN(d.getTime())) {
                date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        } catch (e) {}

        const card = document.createElement('article');
        card.className = 'news-card bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between shadow-lg';
        card.style.animationDelay = `${index * 0.04}s`;

        const safeTitle = escapeHtml(item.title || 'Untitled');
        const safeAuthor = escapeHtml(item.author || 'Plumbing News');
        const safeDesc = escapeHtml(item.description || '');
        const safeLink = (item.link && String(item.link).startsWith('http')) ? item.link : '#';
        const hasImage = item.image && String(item.image).startsWith('http');

        const thumbBlock = hasImage
            ? `<a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="block aspect-[16/9] overflow-hidden bg-slate-800 border-b border-slate-800">
                    <img src="${escapeHtml(item.image)}" alt="" loading="lazy" referrerpolicy="no-referrer"
                         class="w-full h-full object-cover transition duration-300 hover:scale-[1.03]"
                         onerror="this.closest('a').style.display='none'" />
               </a>`
            : '';

        card.innerHTML = `
            ${thumbBlock}
            <div class="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                    <div class="flex items-center justify-between text-xs text-slate-400 mb-3 gap-2">
                        <span class="bg-slate-800 text-[#0084C8] px-2.5 py-1 rounded border border-slate-700 font-semibold line-clamp-1 max-w-[180px]">${safeAuthor}</span>
                        <time class="text-slate-400 shrink-0">${date}</time>
                    </div>
                    <h4 class="font-bold text-slate-100 text-base mb-2 hover:text-[#0084C8] transition leading-snug">
                        <a href="${safeLink}" target="_blank" rel="noopener noreferrer">${safeTitle}</a>
                    </h4>
                    <p class="text-xs text-slate-400 line-clamp-4 leading-relaxed">${safeDesc}</p>
                </div>
                <a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0084C8] hover:text-sky-300 transition pt-3 border-t border-slate-800/80">
                    Read Full Article
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
            </div>
        `;

        newsGrid.appendChild(card);
    });
}

function setupCategories() {
    const container = document.getElementById('categoryContainer');
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border ${
            cat.id === activeCategory.id 
            ? 'bg-[#0084C8] text-white border-[#0084C8] shadow-md shadow-sky-900/30' 
            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
        }`;
        btn.innerText = cat.name;

        btn.addEventListener('click', () => {
            activeCategory = cat;
            document.querySelectorAll('#categoryContainer button').forEach(b => {
                b.className = 'px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800';
            });
            btn.className = 'px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border bg-[#0084C8] text-white border-[#0084C8] shadow-md shadow-sky-900/30';
            fetchNews(activeCategory);
        });

        container.appendChild(btn);
    });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allArticles.filter(item => 
        item.title.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
    );
    renderArticles(filtered);
});

document.addEventListener('DOMContentLoaded', () => {
    switchPage('inflow');
    showRandomIpcCode();
    setupCategories();
    fetchNews(activeCategory);
});
