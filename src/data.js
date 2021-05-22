// TENTATIVELY: 
// Company Name: String
// English Level: Integer
// Location: Array of Strings 
// Shift: Array of Integers 
// Industry: String
// Notes: String
// Shifts: [0, 1, 2] for Day Afternoon Night
// Intermediate English = 2

export const fields = ["English", "Locations", "Shift", "Industry"]

// We need to standardized these things
export const englishMapping = {
  0: "None",
  1: "Basic",
  2: "Intermediate",
  3: "Advanced",
  404: "Unknown"
}

export const shiftMapping = {
  0: "Day",
  1: "Afternoon",
  2: "Night"
}

export const jobs = {
    AdvocateHealth: {
      company: 'Advocate Health',
      english: 2,
      locations: ['Lakeview', 'Park Ridge', 'Oak Lawn', 'South Chicago', 'Downers Grove'],
      shifts: [0, 1, 2],
      industry: "Medical",
      notes: {
        description: 
         `Rachael Fecht is POC; 3 positions available: 
          CNA, Housekeeping, Food and Nutrition. Apply online for a position, include resume. 
          Email Rachael to inform her of application. Personal assessment required. 
          HR interview guaranteed if personal assessment is passed. 
          Pay starts at $14, increases with experience level.`
      }
    },
    
    Amazon: {
      company: 'Amazon',
      english: 2,
      locations: ['Multiple', 'Multiple'],
      shifts: [0, 1, 2],
      industry: "Warehouse",
      notes: {
        description: 
          `Need enough english to nevigate the warehouse. 
          Check https://www.amazon.jobs/en/ for current available jobs. 
          Create account and apply for client. Various locations`
      }
    },

    Aramark: {
        company: 'Aramark',
        english: 2,
        locations: ["6439 N Sheridan Rd"],
        shifts: [0, 1, 2],
        industry: "Food Service and Cleaning",
        notes: {
            description:
            `Submit paper application via email to Kamila Baczek,
             they will contact client directly for phone itnerview. 
             Requires conversational English.`
        }
    },

    ASI: {
        company: 'ASI',
        english: 2,
        locations: ["Multiple", "Multiple"],
        shifts: [0, 1, 2],
        industry: "Home Health Care",
        notes: {
            description: 
            `Home care company. P/T or F/T. Benefits available. 
            Reibursment for gas or public transit cost between clients. 
            More details here- https://www.asiservices.org/`
        }
    },

    "Away Staffing": {
        company: "Away Staffing",
        english: 0,
        locations: ["Multiple", "Multiple"],
        shifts: [0, 1, 2],
        industry: "Staffing Agency",
        notes: {
            description:  
            `Hiring agency for entry level jobs (manufacturing and such) but also more advanced jobs such as CNC positions. 
            Clients can reach out to them directly or email their resume in at jobs@awaystaffing.com.
            We can also reach out to them on the clients behalf. Varying language levels. 
            Most positions at 90 day temp to hire positions. 
            Depending on the hiring prosses of the company clients can begin working in 1-2 weeks`
        }
    },

    Cenveo: {
        company: "Cenveo",
        locations: ["3001 N Rockwell, Chicago, IL 60618"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Warehouse",
        notes: {
            description: 
            `Ingred Romero is contact: ingrid.romero@cenveo.com. 
            The onboarding process involves creating an online account at cenveo.com and then applying. 
            Send resume to Ingrid and schedule an interview.  
            then responding online to an offer letter, drug test scheduling, I-9 form, and filling out the tax credit survey. 
            All online. Typically takes 10-14 days. Make envolopes.`
        }
    }
    ,

    "Chicago Meat Authority": {
        company: "Chicago Meat Authority",
        locations: ["1120 W 47th Pl, Chicago, IL 60609"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Meat Packing and Slaughter House",
        notes: {
            description:
            `Meat butchering and packing
            Go to Elite Staffing to apply in person (3248 W 55th Street, Chicago IL 60632)
            Say you were referred by Kim Salinas; mention Chicago Meat specifically`
        }
    },

    "Double Tree Skokie": {
        company: "Double Tree Skokie",
        locations: ["9599 Skokie Boulevard, Skokie, IL 60077"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Hospitality",
        notes: {
            description: 
            `Contact is Rosa Gallardo. 
            Fill out online application and email Rosa to schedule interview.`
        }
    },

    "Eli's Cheesecake": {
        company: "Eli's Cheesecake",
        locations: ["Multiple", "Multiple"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Food and Manufacturing",
        notes: {
            description:
            `Juana Rivera is HR manager. 
            jrivera@elicheesecake.com. Cheesecake factory. 
            Good option for limited English speaking clients. 
            Public transportion can be an issue because bus hours vary.  
            Benefits after 3 months. $14-$15/hr. 
            Email Juana for openings, send her the clients resume, and then schedule an interview through her. `
        }
    },

    "Faro" : {
        company: "Faro",
        locations: ["O'Hare"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Travel / O`Hare",
        notes: {
            description: ` `
        }
    },

    "Federal Mogul": {
        company: "Federal Mogul",
        locations: ["7450 McCormick Blvd, Skokie, IL 60076"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Car Part Manufacturing",
        notes: {
            description: `Contact is Myra or Liz [mlema@staffmanagement.com or (847)568-220]. 
                            Hiring is through Staff Management there at Federal Mogul. Machine opperator, packing, CNC, and other manafacturing options. 
                            Pay is $14-16 for entry level positions.
                            Benefits after 90 days. Apply online through the Staff Managment Website. 
                            After application client will be prompted to schedule a phone interview. 
                            If client passes they will be invited to attend orientation at Fed Mog and complete a drug test before begining. 
                            If process is lagging it is okay to call Mayra/Liz to  for a check-up. `
        }
    },

    "Georgia Nut Company": {
        company: "Georgia Nut Company",
        locations: ["7500 N linder Ave, Skokie, IL 60077"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Food Manafacturing",
        notes: {
            description: `
             Factory packing nuts and candies.
             Go in person on a Tuesday or Thursday to apply and take math and English test. `
        }
    },

    "Gibsons": {
        company: "Gibsons",
        locations: ["1028 N. Rush St., Chicago, IL 60611"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Food Industry",
        notes: {
            description:
            `Usually dishwashing postions available. 
             Fill out online application and contact Nancy Bueno to review application and schedule interview`
        }
    },

    "Gotham Greens": {
        company: "Gotham Greens",
        locations: ["720 E 111th Street, Chicago, IL 60628"],
        english: 404,
        shifts: [1],
        industry: "Green House",
        notes: {
            description: 
            `Located far south side - urban farming company
            $12.25/hr full time. Shifts are between 6am-8am start and 2:30-4:30pm finish
            Full-time work - operate 7 days per week Greenhouse job: Arranging, preparing, seeding, harvesting plants
            Packing House job: packing and labeling Low English level required
            Application process: send resume by email to Alexis, she will call individual directly unless you mention that English is an issue.`
        }
    },

    "Gourmet Gorilla": {
        company: "Gourmet Gorilla",
        locations: ["1200 W. Cermak Road, Chicago , IL 60608"],
        english: 2,
        shifts: [1],
        industry: "Food Manufacturing",
        notes: {
            description: 
            `Email resume and Kevin will email to arrange interview time. If they give job offer the client can often start the next day.
            Full--time during the day; $12/hr`
        }
    },

    "Harvard Maintenance": {
        company: "Harvard Maintenance",
        locations: ["Downtown Area"],
        english: 2,
        shifts: [0 ,1, 2],
        industry: "Cleaning",
        notes: {
            description: 
            ` Contact is Edson Alvarez [ealvarez@harvardmaint.com or (312)262-6452]. 
              Apply online and send clients resume to Edson. 
              Client will need to complete online paperwork and send Edson copies of their SSC, State-ID, and Permenant Residency Card. `
        }
    },

    "Hilton O`Hare": {
        company: "Hilton O`Hare",
        locations: ["O`Hare"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Hospitality",
        notes: {
            description: 
            `
                Complete online application and contact Anna Hopovic for interview.
            `
        }
    },

    "House of Blues": {
        company: "House of Blues",
        locations: ["333 N. Dearborn, Chicago, IL 60610"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Restaurant and Music Venue",
        notes: {
            description:
            `
            Email Imelda Hererra to inquire about openings and to schedule an interview, 
            Before interview complete the online application. 
            Bring resume and other employment documents to the interview, prepare clients to note that they have very open availability.
            Interview is basic. Afterwards background check/I9 work is done and client will be called back for onboarding paperwork. 
            Start date is usually 2-3 days after onboarding.
            `
        }
    },

    "Koch Foods": {
        company: "Koch Foods",
        locations: ["4404 West Berteau Avenue, Chicago, IL 60641"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Meat Packing",
        notes: {
            description: 
            `Malene Salamanca is HR contact. Phone: (773) 286-4343 ext: 7300
            Email: marlene.salamanca@kochfoods.com. Complete application and email to Marlene. Good option for limited english speakers. Chicken processing plant. $14/hr. Benefits offered. 
            `
        }
    },

    "Lincoln Provision, INC": {
        company: "Lincoln Provision, INC",
        locations: ["824 W 38th Pl, Chicago, IL 60609"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Meat Processing Plant",
        notes: {
            description:
            `Butcher and general labor positions. Butcher $15 w/t experience or $14.50 w/o. General $14. 
            Union so raises will increase after 90 days. Benefits w/t a pension. `
        }
    },

    "Mirrior Mirror Salon": {
        company: "Mirrior Mirror Salon",
        locations: ["807 W Randolph St "],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Beauty",
        notes: {
            description:
            ` Contact is Stacy. (312)217-7795, evielula@gmail.com. 
              Hire for their hair, waxing, nail, and massage services. 
              Someone with experience perfered, but can train as well. 
              The hours are flexible but full-time is a possibility.  
              $20/hr plus tips. No benefits offered. No high school diploma required.`
        }
    },

    "Misricordia": {
        company: "Misricordia",
        locations: ["2001 W. Devon Ave, Chicago, IL 60659"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Long term rehabilitation home",
        notes: {
            description: `
            Direct Support Proffessional positions (DSP) HS/GED needed.  
            Decent english. 5w paid training. Needs to be available on weekends. $16-18 .  
            Has housekeeping and kitchen aid positions. 
            Limited english and education required (14.25-15). 
            Full benefits. International degrees count if can be varified. 
            Have client apply online and send name to Kim Huwe (kimberlyh@misericordia.com)`
        }
    },

    "Nemera": {
        company: "Nemera",
        locations: ["600 Deerfield Pkwy, Buffalo Grove, IL 60089"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Medical Manufacturing",
        notes: {
            description: 
            `Have the client email or text Matt Skierkiewicz at <matt.skierkiewicz@randstadusa.com>. 
             Contract to hire position after 600 hrs of work.  Entry level positions are mainly machine operator/ packer positions. 
             Client will be packing medical supplies as they come off the machine line. 
             Requirments: HS diploma/ GED, vision test (need to see .7mm vission). 
             Two days on/ two days off schedule. Must be able to lift 15-20 ilbs. $14/hr for day shift $15/ hr for night shift. 
             Increases after hired. Benifits after hired. Some offered during contract.`
        }
    },

    "Penninsula Hotel": {
        company: "Penninsula Hotel",
        locations: ["108 E. Superior St, Chicago, IL 60611"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Hospitality",
        notes: {
            description: 
            `Contact is Aileen Hilario. Fill out online application and email name of applicant to Aileen for review. 
            Peninsula will contact to schedule an interview time.`
        }
    },

    "Prolist 123": {
        company: "Prolist 123",
        locations: ["7080 McCormick Blvd, Lincolnwood, IL 60712"],
        english: 0,
        shifts: [0, 1, 2],
        industry: "Insulation and Carpentry",
        notes: {
            description: `
            $15/hr  with no experience, will increase as experience increases.
            Baised of performence not time. At least 4 day/ week.  
            1099 with no benefits. Candidates needs to be 5'6/7" of shorter and small to navigatwe small spaces. `
        }
    },

    "Prospect": {
        company: "Prospect",
        locations: ["O'Hare"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Airport",
        notes: {
            description: ``
        }
    },

    "Rush Medical Group": {
        company: "Rush Medical Group",
        locations: ["Downtown, Oak Park, Aurora"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Medical Services",
        notes: {
            description: 
            `Have client apply to position online and sent resume to Kevine Irvine (Kevin_Irvine@rush.edu), 
            Chanel Smith (Chanel_N_Smith@rush.edu), and Michael Jones (Michael_A_Jones@rush.edu). 
            They are apart of the HR team and will be able to flag the clients application. 
            Have community partnerships that they could potential pass applicant off to if they do not have a position for them. `
        }
    },

    "S & C": {
        company: "S & C",
        locations: ["6601 N Ridge Blvd, Chicago, IL 60626"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Manufacturing and Engineering",
        notes: {
            description: 
            `Talant aquisition manger is Rentia Goodwin ( Renita.Goodwin@sandc.com ). 
            THey have multiple manafacturing positions, check website. 
            Also have internships and a co-op program. 
            Pay starts at $15/hr but changes based on experience and positions. They offer benfits. `
        }
    },

    "Scrub Inc": {
        company: "Scrub Inc",
        locations: ["O'Hare"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Cleaning",
        notes: {
            description:
            `Go to Scrub office on Elston and Milwaukee to apply in person. 
            After initial application and interview go to O'Hare for badging and finger printing (can take up to 2-3 weeks).
            Pick up badge and attend orientation and training at O'Hare before starting.`
        }
    },

    "Serendipity": {
        company: "Serendipity",
        locations: ["Multiple", "Multiple"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Home Health Care",
        notes: {
            description: `Fill out application and turn it in to Jux at office with other required documents 
            (High school diploma, TB test, Physical, SSC, and proof of ID)`
        }
    },

    "Serenity": {
        company: "Serenity",
        locations: ["Multiple", "Multiple"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Home Health Care",
        notes: {
            description: `Contact is Alao (Isokens friend). Phone: (773)416-3338 or laraa@serenityhhc.com`
        }
    },

    "South Chicago Packing": {
        company: "South Chicago Packing",
        locations: ["945 W 38th St., Chicago, IL 60609"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Food Manufacturing and Packing",
        notes: {
            description: `Apply online and email Nikole Maclan to arrange interview and warehouse tour. 
            Client will hear back shortly about scheduling a time for the onboarding process.`
        }
    },

    "Starbucks": {
        company: "Starbucks",
        locations: ["100 S. Wabash, Chicago, IL 60603"],
        english: 2,
        shifts: [0, 1],
        industry: "Food and Beverage",
        notes: {
            description: `Email Shawn Gancarz the client's name and brief overview of availability so he can best match them to a store in his district. 
            Submit online application and interview, wait to hear back from store manager.`
        }
    },

    "The W at City Center": {
        company: "The W at City Center",
        locations: ["172 Adams St, Chicago, IL 60603"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Hospitality",
        notes: {
            description: ``
        }
    },

    "Webb Masonary Restoration": {
        company: "Webb Masonary Restoration",
        locations: ["Multiple", "Multiple"],
        english: 1,
        shifts: [0, 1, 2],
        industry: "Carpentry and Masonry",
        notes: {
            description: `Connact Dan on one of #'s. 
            (773)9897389 (Office)  
            (812)6975851 (In Cell) (773)297-9021 (Chicago Cell)   
            Email is webbtuc@sbcglobal.net`
        }
    },

    "World Wide Flight Service": {
        company: "Webb Masonary Restoration",
        locations: ["O`Hare"],
        english: 2,
        shifts: [0, 1, 2],
        industry: "Airport",
        notes: {
            description: `Passanger Service Position- Working in the international terminal aiding passangers checking into their flight. 
            Looking for Spanish, Viet, Mandarine, Polish, French, Arabic, Farsi, Turkish... 
            Need a drivers liscense and to be able to lift luggage. 
            $14.10 per hour.  
            Hiring P/t (dental/vision) and F/T (Med/dent/life/vision). 
            Apply online, schedule meeting with Patrice, interview with HR manager, then badging and training.`
        }
    },
}