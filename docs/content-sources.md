# Content sources

Every business fact on the site comes from Beyond Cleaning's current website, reviewed on **23 October 2026**. Re-check these pages before launch, and before adding any new claim.

| Page                  | URL                                                        |
| --------------------- | ---------------------------------------------------------- |
| Home                  | https://beyondcleaning.com/                                |
| Contact               | https://beyondcleaning.com/contact-nyc/                    |
| About                 | https://beyondcleaning.com/about-nyc/                      |
| FAQ                   | https://beyondcleaning.com/frequently-asked-questions-nyc/ |
| All cleaning services | https://beyondcleaning.com/all-cleaning-services/          |

Facts live in `lib/site.ts`; content lives in `lib/content.ts` and `lib/request.ts`. Components never hard-code them.

## Facts used

| Claim on this site                                                                            | Source                                           | Where                                    |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| Name "Beyond Cleaning"; legal name "Beyond Cleaning NYC, Inc."                                | Home, Contact                                    | `lib/site.ts`                            |
| Phone (212) 520-4815; free quotes by phone                                                    | Home, Contact, FAQ                               | `lib/site.ts`                            |
| 244 5th Avenue, New York, NY 10001                                                            | Contact                                          | `lib/site.ts`                            |
| Hours: Monday to Friday 8am–6pm, Saturday 9am–4pm                                             | Contact                                          | `lib/site.ts`                            |
| Serves "New York City and the surrounding areas"                                              | Home, Contact, About                             | `lib/site.ts`                            |
| No email address is published                                                                 | Contact (form only: name, email, phone, message) | Planner prepares notes, never emails     |
| The 44 service names and their links                                                          | All cleaning services                            | `lib/content.ts` `serviceGroups`         |
| Space types (apartments, brownstones, co-ops, condos, offices, medical, restaurants…)         | Home ("who we clean for" lists)                  | `lib/content.ts` `spaces`, business band |
| Price depends on size, number of bathrooms and extra requests                                 | FAQ                                              | Quotes section, planner fields, FAQ      |
| The first visit costs more than later regular visits                                          | FAQ                                              | Quotes section, FAQ                      |
| No long-term contract required                                                                | FAQ                                              | Quotes section, FAQ                      |
| Regular cleaning on weekdays in business hours; event and after-hours office cleaning any day | FAQ                                              | Business band, FAQ                       |
| Key on file, doorman, or be home                                                              | FAQ                                              | First visit, FAQ                         |
| Alarm off or share a code; mention pets; put valuables away                                   | FAQ                                              | First visit                              |
| Team brings equipment and single-use disposables; can use your products                       | FAQ                                              | First visit, FAQ                         |
| 24 hours' notice to cancel; holiday visits rescheduled                                        | FAQ                                              | First visit                              |
| Cash, check and major credit cards; card on file                                              | FAQ                                              | FAQ                                      |
| A clear scope of work before cleaning starts                                                  | Home                                             | Not used yet; safe to add                |

Editorial (not business claims): the grouping of the 44 services into eight headings, the "services to ask about" suggestions per space type, and section headlines.

## Left off: ask the owner

These appear on the live site but are not on this one, because they are promises customers hold a business to, they change over time, or the live copy contradicts itself.

| Claim on the live site                                                     | Why it's off                                                                  | Question for the owner                                                                |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| "Bonded and insured"                                                       | Only the owner can confirm current cover                                      | Are you bonded and insured today? Can we say so, and name the insurer if asked?       |
| "All of our employees are background checked"; staff training              | A promise about hiring practice                                               | Is every team member background-checked and trained? Can we describe how?             |
| "Eco-friendly", "green cleaning solutions", "All Natural", "99% Effective" | Unverifiable product claims, near template copy                               | Which products do you use? Are they actually green-certified?                         |
| "100% Guaranteed": re-clean, repair or refund                              | The guarantee copy names **"GreenPro"**, another company                      | Do you offer a satisfaction guarantee? What exactly does it cover?                    |
| "Emergency services 24/7"                                                  | A response-time promise; the FAQ also says immediate service isn't guaranteed | Is someone really reachable 24/7 for water and flood damage? Which number?            |
| "10+ years" (home) vs "decades" (about)                                    | The two pages disagree                                                        | What year did Beyond Cleaning start?                                                  |
| "#1", "Exceed your expectations", "state-of-the-art"                       | Unverifiable superlatives                                                     | (No action; leave off.)                                                               |
| "Trained to adhere to CDC virus safety protocols"                          | Dated and unverifiable                                                        | Is this still current?                                                                |
| Insurance-claim assistance                                                 | A service promise                                                             | Do you still help clients with insurance claims after water damage?                   |
| Recurring and yearly-plan discounts; $50 lockout fee; $15 late fee         | Prices change                                                                 | Should discounts or fees be on the site? Current amounts?                             |
| Google reviews (Trustindex widget)                                         | Reviews change; never retype them                                             | Can you share your Google Business Profile link? We'll link to it instead of quoting. |
| Current logo file is named `BEYOND-temp-logo-2.png` (276 × 100 PNG)        | The wordmark here is redrawn from it                                          | Do you have an original logo file, or is this redrawn version welcome?                |

The ChatGPT build's retyped Paloma Dalton review, its "Bonded & insured / Eco-friendly" trust strip and its 24/7 emergency banner were removed for these reasons.
