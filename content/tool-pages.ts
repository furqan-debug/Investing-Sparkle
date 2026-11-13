import type { SourceKey } from './tax-rates';

/**
 * Long-form copy for each tool page.
 *
 * Keeping it here rather than inside the page files means the calculator, the
 * explanation and the sources stay next to each other, and a future tool page
 * only needs a thin file that renders this content.
 */

export type ToolPageContent = {
  slug: string;
  category: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  lede: string;
  howTitle: string;
  howBody: string;
  sections: { heading: string; paragraphs: string[] }[];
  sources: SourceKey[];
  sourceExtra?: string;
  sourceTitle?: string;
  sourceIntro?: string;
  related: string[];
};

export const toolPages: Record<string, ToolPageContent> = {
  'salary-income-tax-calculator': {
    slug: 'salary-income-tax-calculator',
    category: 'tax-zakat',
    metaTitle: 'Salary Income Tax Calculator 2026-27 | FBR slabs and take-home',
    metaDescription:
      'Calculate salary tax under the Finance Act 2026 slabs, including zakat, donations and pension credits. See annual tax, monthly take-home and the slab breakdown.',
    title: 'Salary Income Tax Calculator 2026-27',
    lede: 'The 2026-27 salaried slabs, the deductions that actually reduce tax, and the monthly figure that reaches your account. Free with a Google account.',
    howTitle: 'A progressive table, not a single rate.',
    howBody:
      'Each slab applies only to the income inside it. The fixed amount in the table is the tax already accumulated from the lower bands, so the arithmetic is the same as adding up each slice separately.',
    sections: [
      {
        heading: 'What changed for 2026-27',
        paragraphs: [
          'The Finance Act 2026 kept the tax-free threshold at Rs 600,000 and restructured salary tax into eight bands. The top 35% rate now starts above Rs 7 million rather than Rs 4.1 million, and the 9% surcharge on high salaried income was withdrawn.',
          'The intermediate bands are where most of the relief sits. A salary just above Rs 1.2 million moves from 2.5% to 11%, but only on the slice above the threshold, not on the whole amount. That distinction is the single most common source of inflated tax estimates.',
        ],
      },
      {
        heading: 'The deductions that actually reduce tax',
        paragraphs: [
          'Zakat paid under the Zakat and Ushr Ordinance is deducted from taxable income. Approved charitable donations are deductible up to 30% of taxable income. A contribution to an approved pension fund earns a credit at your average rate of tax, capped at the lower of the contribution or 20% of taxable income.',
          'A deduction reduces the income the slabs are applied to. A credit reduces the tax itself. The tool keeps them separate because mixing the two produces a confident wrong answer.',
        ],
      },
      {
        heading: 'What this calculator does not know',
        paragraphs: [
          'It does not know how your employer classified each allowance, whether you had more than one employer, or whether you have foreign income. It also does not calculate the ATL surcharge for a late return. Those are return-level questions.',
          'Use the figure to plan your year and to check a salary certificate. Reconcile it with your employer’s withholding and, if the amount is material, with a tax professional.',
        ],
      },
    ],
    sources: ['financeAct2026', 'circular2', 'ordinance'],
    sourceExtra:
      'Salaried slabs are in Division I of Part I of the First Schedule. The 9% surcharge was withdrawn by the Finance Act 2026. The 10% surcharge on non-salaried income above Rs 10 million remains.',
    related: ['business-income-tax-calculator', 'zakat-calculator', 'rental-income-tax-calculator'],
  },

  'business-income-tax-calculator': {
    slug: 'business-income-tax-calculator',
    category: 'tax-zakat',
    metaTitle: 'Business & Freelancer Income Tax Calculator 2026-27',
    metaDescription:
      'Estimate income tax for sole proprietors, AOPs, professional firms and freelancers under the 2026-27 non-salaried slabs, including surcharge and the 40% professional cap.',
    title: 'Business & Freelancer Income Tax Calculator',
    lede: 'Sole proprietors, partnerships, professional firms and freelancers are taxed on a different table from salaried people. Enter profit, not turnover, and see where the surcharge starts.',
    howTitle: 'The non-salaried table starts at 15%, not zero.',
    howBody:
      'The first Rs 600,000 is still tax-free, but the next rupee is taxed at 15% rather than 1%. The top rate is 45%. A professional firm that cannot incorporate is capped at 40%.',
    sections: [
      {
        heading: 'Why the business table is different',
        paragraphs: [
          'Salary tax and business tax are separate divisions of the First Schedule. A sole proprietor with Rs 3 million of profit pays more than a salaried person with the same income because the non-salaried bands rise faster and top out 10 percentage points higher.',
          'An AOP is taxed at the same slab rates as an individual, but the surcharge and the compliance rules are applied to the association rather than to each partner. A professional firm that is prohibited from incorporating gets a 40% cap instead of 45%.',
        ],
      },
      {
        heading: 'Profit, not turnover',
        paragraphs: [
          'The slabs apply to taxable income after allowed business expenses. Revenue alone is not the base. The tool asks for profit for that reason, and it does not attempt to decide which expenses are admissible.',
          'A 10% surcharge applies where taxable income exceeds Rs 10 million. Minimum tax, turnover tax and super tax sit outside this calculation and can change the final bill.',
        ],
      },
      {
        heading: 'Export receipts are a separate regime',
        paragraphs: [
          'IT and IT-enabled export receipts are often taxed under a final withholding regime rather than the slab table. The rate depends on registration, including PSEB status, and on the section that applies.',
          'The export mode is deliberately editable. It shows the arithmetic at the rate you enter and does not pretend to know which rate your registration attracts.',
        ],
      },
    ],
    sources: ['financeAct2026', 'ordinance', 'circular2'],
    sourceExtra:
      'Non-salaried slabs are unchanged by the Finance Act 2026. The 10% surcharge under section 4AB applies above Rs 10 million. The 40% cap for a professional firm that cannot incorporate is in the First Schedule.',
    related: ['salary-income-tax-calculator', 'rental-income-tax-calculator', 'dividend-tax-calculator'],
  },

  'rental-income-tax-calculator': {
    slug: 'rental-income-tax-calculator',
    category: 'tax-zakat',
    metaTitle: 'Rental Income Tax Calculator 2026-27 | Section 155 and 15A',
    metaDescription:
      'Calculate tax on rent for individuals, AOPs and companies, including section 155 withholding, section 15A deductions and the final liability when you file.',
    title: 'Rental Income Tax Calculator',
    lede: 'Two numbers matter: what the tenant withholds under section 155, and what you actually owe on net rent after section 15A deductions. See both, and the gap between them.',
    howTitle: 'Withholding is not the same as the final tax.',
    howBody:
      'The tenant deducts a stepped amount from the gross rent. When you file, you deduct the section 15A allowances from that rent and apply the slab rates. The withholding is then credited against the result.',
    sections: [
      {
        heading: 'Two taxes, one rent',
        paragraphs: [
          'Section 155 requires a prescribed person to deduct tax from rent. For an individual or AOP landlord the rate steps up from 5% to 25% as annual rent rises. A company landlord pays a flat 15%. A non-filer pays double in both cases.',
          'That deduction is adjustable. It is not a separate final tax on top of your income tax. If the final liability on net rent is lower, the difference is a refund. If it is higher, you pay the balance with your return.',
        ],
      },
      {
        heading: 'The 20% repairs allowance',
        paragraphs: [
          'Section 15A allows a repairs allowance of 20% of the rent without receipts. Property tax, insurance, ground rent, mortgage profit and collection costs are also deductible within limits.',
          'Those allowances reduce the final tax, not the amount the tenant hands over each month. A landlord who only looks at the monthly deduction will overestimate the annual bill.',
        ],
      },
      {
        heading: 'Does your tenant have to deduct?',
        paragraphs: [
          'A private individual tenant is only required to deduct once the annual rent reaches Rs 1.5 million. A company, government office or other prescribed person deducts from the first rupee.',
          'If your tenant is below the threshold, the withholding shown here is not being collected. Treat it as the tax you need to provide for, not as cash you have already paid.',
        ],
      },
    ],
    sources: ['whtCard', 'ordinance', 'financeAct2026'],
    sourceExtra:
      'Section 155 rates are unchanged for 2026-27. The non-filer column doubles each band under the Tenth Schedule. Section 15A sets the deductions available when filing.',
    related: ['salary-income-tax-calculator', 'property-transfer-tax-calculator', 'zakat-calculator'],
  },

  'psx-capital-gains-tax-calculator': {
    slug: 'psx-capital-gains-tax-calculator',
    category: 'tax-zakat',
    metaTitle: 'Capital Gains Tax Calculator for PSX Shares 2026-27',
    metaDescription:
      'Calculate CGT on listed shares and mutual fund units for filers and non-filers, using the rate set by the purchase date and holding period.',
    title: 'Capital Gains Tax Calculator for PSX Shares',
    lede: 'The rate on a share sale is decided by when you bought, not by how much you made. Enter the purchase date and see which regime applies, what the gain is taxed at, and what you keep.',
    howTitle: 'The purchase date picks the regime.',
    howBody:
      'There are five purchase-date windows, and each has its own rate structure. The sale date only decides which tax year the gain belongs to. That is why the same profit can be taxed at 0%, 15% or 30% depending on when the shares were acquired.',
    sections: [
      {
        heading: 'What changed after 1 July 2025',
        paragraphs: [
          'For shares bought on or after 1 July 2025, the rate is 15% for filers and non-filers alike. The Finance Act 2026 removed the Tenth Schedule exemption that previously gave non-filers a different treatment on these holdings.',
          'For shares bought between 1 July 2024 and 30 June 2025, the split remains 15% for a filer and 30% for a non-filer. Older holdings follow the holding-period table, which falls to zero after six years for the pre-2024 regime.',
        ],
      },
      {
        heading: 'The gain, not the sale value',
        paragraphs: [
          'CGT is charged on the profit after deducting cost. A sale at Rs 3 million of shares that cost Rs 2 million produces a Rs 1 million gain, not a Rs 3 million tax base. A loss produces no CGT, although the loss may need to be reported and carried forward under the applicable rules.',
          'NCCPL computes the official gain from its own trade records and issues a certificate. Its cost basis can differ from a simple average, especially across multiple purchases and bonus shares.',
        ],
      },
      {
        heading: 'Mutual funds are not identical',
        paragraphs: [
          'The same date-based table is a useful starting point for mutual fund units, but the fund’s equity and debt mix can change the rate. The fund company deducts the tax at redemption and reports it.',
          'Use this tool to plan the sale, then check the fund’s tax note and the redemption statement before you rely on the number.',
        ],
      },
    ],
    sources: ['financeAct2026', 'ordinance', 'whtCard'],
    sourceExtra:
      'The rates are in Division VII of Part I of the First Schedule, read with section 37A. The Finance Act 2026 removed the non-filer exemption for securities acquired on or after 1 July 2025.',
    related: ['dividend-tax-calculator', 'property-transfer-tax-calculator', 'roi-calculator'],
  },

  'dividend-tax-calculator': {
    slug: 'dividend-tax-calculator',
    category: 'tax-zakat',
    metaTitle: 'Dividend Tax Calculator Pakistan 2026-27 | Filer and non-filer',
    metaDescription:
      'Calculate withholding tax on dividends from listed shares, IPPs, REITs and mutual funds, for filers and non-filers, and see the net amount you keep.',
    title: 'Dividend Tax Calculator',
    lede: 'The payer decides the rate. A listed company, an IPP, a REIT and a debt fund are not taxed the same, and a non-filer pays roughly double in every column.',
    howTitle: 'One section, several rate columns.',
    howBody:
      'Section 150 sets withholding on dividends. The general rate is 15%, but IPPs pay 7.5%, debt funds pay 25%, and a special purpose vehicle distribution can be 35%. The rate is applied to the gross dividend.',
    sections: [
      {
        heading: 'The payer decides the rate',
        paragraphs: [
          'A dividend from a listed company is the general case at 15% for a filer. An independent power producer is treated more favourably at 7.5%. A REIT is back at 15%. A mutual fund is 15% where its income is mainly equity and 25% where at least half comes from profit on debt.',
          'A distribution from a REIT special purpose vehicle to a recipient other than the REIT scheme carries 35%. A company paying out of exempt income or losses carries 25%.',
        ],
      },
      {
        heading: 'Filer status is worth checking',
        paragraphs: [
          'A non-filer pays 30% on the general rate, 50% on a debt fund, and 70% on a special purpose vehicle distribution. The gap is large enough that checking your ATL status before a payout date is worth the effort.',
          'The status that matters is the one you hold when the dividend is paid, not the one you intend to hold at filing.',
        ],
      },
      {
        heading: 'Final, but still reportable',
        paragraphs: [
          'Dividend withholding is generally a final tax, so there is usually no further tax on the amount. It still belongs in your return, and the company’s tax certificate is the record you need.',
          'A dividend is not free money. The share price usually adjusts by roughly the dividend on the ex-date, so the net yield on cost is a better measure of what the holding actually produced than the headline payout.',
        ],
      },
    ],
    sources: ['whtCard', 'financeAct2026', 'ordinance'],
    sourceExtra:
      'Section 150 rates for tax year 2027. IPP dividends are 7.5% for a filer. Debt funds are 25%. A non-filer pays approximately double in every column.',
    related: ['dividend-income-calculator', 'dividend-yield-calculator', 'psx-capital-gains-tax-calculator'],
  },

  'property-transfer-tax-calculator': {
    slug: 'property-transfer-tax-calculator',
    category: 'tax-zakat',
    metaTitle: 'Property Transfer Tax Calculator 2026-27 | 236K, 236C and CGT',
    metaDescription:
      'Calculate section 236K buyer tax, section 236C seller tax and capital gains tax on a property sale under the Finance Act 2026 rates.',
    title: 'Property Transfer Tax Calculator',
    lede: 'One property deal can trigger three taxes. Work out what the buyer pays under 236K, what the seller pays under 236C, and what the gain is taxed at under section 37.',
    howTitle: 'Three taxes, two sides, one value.',
    howBody:
      '236K and 236C are advance taxes on the transfer value. CGT is tax on the gain. 236C is adjustable, so it is credited against the CGT rather than added to it. The tool separates cash at transfer from the final cost.',
    sections: [
      {
        heading: 'The higher of two values',
        paragraphs: [
          'Property tax is charged on the higher of the price written in the deed and the FBR or DC notified value. A deed price below the official value does not reduce the tax.',
          'For 2026-27 a filer pays 1.25% as a buyer under 236K and 2.75% as a seller under 236C. Non-filers pay 10.5%, 14.5% or 18.5% as buyers depending on value, and 11.5% as sellers.',
        ],
      },
      {
        heading: '236C is a credit, not an extra',
        paragraphs: [
          'The seller’s 236C is usually adjustable against the year’s tax, including the CGT on the same sale. Adding 236C and CGT together overstates the cost. The tool shows the credit and the CGT balance that remains.',
          'A same-tax-year sale can make 236C a minimum tax, and a qualifying non-resident who bought through a foreign currency account can have it treated as final. Those cases need a professional.',
        ],
      },
      {
        heading: 'What the Finance Act 2026 changed',
        paragraphs: [
          'The buyer rate for filers fell to a flat 1.25% from a banded 1.5% to 2.5%. The seller rate fell to 2.75% from 4.5% to 5.5%. The late-filer tier was removed, so the choice is filer or non-filer.',
          'Section 7E, the deemed-income tax on immovable property, was omitted. Provincial stamp duty, registration charges and capital value tax are separate and not included here.',
        ],
      },
    ],
    sources: ['financeAct2026', 'ordinance', 'salientFeatures'],
    sourceExtra:
      'The enacted Finance Act 2026 sets 236K at 1.25% and 236C at 2.75% for filers. Budget papers quoted 1.5% for 236K before enactment. Property acquired on or after 1 July 2024 is on a flat 15% CGT regime for filers.',
    related: ['rental-income-tax-calculator', 'psx-capital-gains-tax-calculator', 'zakat-calculator'],
  },

  'dividend-purification-calculator': {
    slug: 'dividend-purification-calculator',
    category: 'tax-zakat',
    metaTitle: 'Dividend Purification Calculator | Shariah-compliant stocks',
    metaDescription:
      'Work out the charity amount needed to purify dividends and gains from Shariah-compliant stocks, using the company’s non-compliant income ratio.',
    title: 'Dividend Purification Calculator',
    lede: 'A Shariah-compliant stock can still earn a small amount of non-compliant income. Purification is the charity that clears your share of it. Enter the dividend and the company’s ratio.',
    howTitle: 'The ratio comes from the company, not from us.',
    howBody:
      'The common method divides non-compliant income by total revenue, then applies that percentage to the dividend or gain you received. The result is given in charity without expecting a reward for it.',
    sections: [
      {
        heading: 'Purification is not zakat',
        paragraphs: [
          'Zakat is an annual obligation on qualifying wealth. Purification is a separate cleanup of income that passed through a business activity a scholar regards as impermissible. The two can apply to the same holding in the same year, and neither replaces the other.',
          'Purification applies after screening, not instead of it. A stock that fails the business-activity or financial-ratio tests is not made acceptable by giving a percentage away.',
        ],
      },
      {
        heading: 'Where the ratio comes from',
        paragraphs: [
          'Listed companies that market themselves as Shariah-compliant usually publish a purification ratio or the underlying figures in the annual report. Use the same source for both the numerator and the denominator, in the same year.',
          'If you use a screening service, use the ratio it publishes. Do not mix a ratio from one provider with financials from another year.',
        ],
      },
      {
        heading: 'What to do with the amount',
        paragraphs: [
          'Give it to a cause that does not benefit you or your family, and do not count it as sadaqah or zakat. Keep a record of the calculation, because the ratio changes with each annual report.',
          'Scholars differ on the denominator, on which income counts, and on whether the amount is given from the dividend or from the whole gain. Follow the method your scholar uses. Where the amount is material, ask rather than rely on a calculator.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method and limits',
    sourceIntro:
      'This is a Shariah calculation, not a statutory tax figure. There is no single official rate, because the ratio comes from each company’s own disclosures and the method varies between screening services.',
    sourceExtra:
      'The calculator follows the common ratio method. It does not issue a fatwa or decide whether a stock is compliant. Ask a qualified scholar where the amount is material or the disclosure is unclear.',
    related: ['zakat-calculator', 'shariah-compliance-checker', 'dividend-tax-calculator'],
  },

  'psx-brokerage-calculator': {
    slug: 'psx-brokerage-calculator',
    category: 'psx-trading',
    metaTitle: 'PSX Brokerage & Trading Profit Calculator | Fees and break-even',
    metaDescription:
      'Work out every charge on a PSX round trip: broker commission, sales tax, PSX trading and regulatory fees and the SECP levy. See net profit, break-even price and the move you need.',
    title: 'PSX Brokerage & Trading Profit Calculator',
    lede: 'A trade has to clear its own costs before it makes you anything. Enter the prices you dealt at and the rates on your contract note, and see the rupee figure that actually lands.',
    howTitle: 'Two sides, four charges, one net figure.',
    howBody:
      'Each side of the trade carries a broker commission, sales tax on that commission, and three small exchange and regulator levies. The tool charges both sides, subtracts the total from the gross profit, and solves for the sale price that only breaks even.',
    sections: [
      {
        heading: 'Why the break-even price is not your buy price',
        paragraphs: [
          'You pay commission when you buy and again when you sell, and the exchange levies are charged on both sides. A stock bought at Rs 100 therefore has to be sold above Rs 100 before the trade is flat, and the gap widens when the commission has a per-share floor.',
          'The floor is why small trades cost proportionally more. At 3 paisa a share, a 100-share trade pays at least Rs 3 in commission, which is a much larger percentage of a Rs 10,000 trade than of a Rs 1,000,000 one.',
        ],
      },
      {
        heading: 'The commission is yours to negotiate',
        paragraphs: [
          'PSX publishes a standard range for commission rather than a single price. The common shape is 0.15% of value or 3 paisa a share, whichever is higher, on each side, and some brokers charge more or apply a different floor. Your broker\'s written tariff is the binding document.',
          'Sales tax on the commission depends on where the broker is registered: 15% in Sindh, 16% in Punjab and Islamabad. The tool applies the same rate to the exchange levies because the schedule treats them the same way. If your contract note says otherwise, change the rate.',
        ],
      },
      {
        heading: 'What is not in this number',
        paragraphs: [
          'Capital gains tax is separate. For shares bought on or after 1 July 2025 the rate is 15% for both filers and non-filers, and NCCPL deducts it from the sale proceeds before settlement. A profitable trade therefore nets less than this calculator shows.',
          'Account maintenance fees, annual NCCPL charges, margin financing cost and slippage are also outside the figure. Some brokers quote an all-in commission that already includes the levies. If yours does, set the levy fields to zero so the cost is not counted twice.',
        ],
      },
    ],
    sources: ['psxSchedule', 'psxRegulations', 'psxTradingInfo'],
    sourceTitle: 'Rates and sources',
    sourceIntro:
      'Checked 13 November 2026. The exchange levies come from the PSX schedule of charges. Commission and sales tax are editable because they depend on your broker and on the province the broker is registered in.',
    sourceExtra:
      'The schedule lists Rs 3.50 per Rs 100,000 as the ready-market trading fee, Rs 0.62084 per Rs 100,000 as the regulatory fee, and a SECP levy of 0.00065%. Your broker passes these through on the contract note, sometimes under different labels.',
    related: ['psx-capital-gains-tax-calculator', 'position-size-calculator', 'psx-circuit-lock-calculator'],
  },

  'stock-average-price-calculator': {
    slug: 'stock-average-price-calculator',
    category: 'psx-trading',
    metaTitle: 'Stock Average Price Calculator | Weighted cost across several buys',
    metaDescription:
      'Calculate the weighted average cost of a PSX holding across several buys, and the number of shares needed at a given price to reach a target average.',
    title: 'Stock Average Price Calculator',
    lede: 'Your average cost is not the average of the prices you remember. It is weighted by shares, and it moves every time you add to a position.',
    howTitle: 'Weighted by shares, not by the number of buys.',
    howBody:
      'Each purchase contributes in proportion to the number of shares bought, so a large buy at one price outweighs a small buy at another. The tool adds the lots, divides total cost by total shares, and then solves for the shares needed to reach a target average.',
    sections: [
      {
        heading: 'The average is a cost, not a target',
        paragraphs: [
          'A lower average reduces the price at which the position breaks even, but it does not change the business, the earnings or the reason you bought. It only changes how much money is exposed and at what price.',
          'This matters when averaging down into a falling stock. The average falls because you bought more at a lower price, not because the position became safer. The amount at risk has usually gone up.',
        ],
      },
      {
        heading: 'When the target cannot be reached',
        paragraphs: [
          'To pull an average towards a target, the new price has to sit on the other side of that target. If you are averaging down, the new price must be below the target. If it is above, every new share pulls the average up, not down.',
          'A target equal to the new price can never be reached. Each purchase moves the average towards that price without arriving, so the solver returns no answer rather than a very large number.',
        ],
      },
      {
        heading: 'What the average leaves out',
        paragraphs: [
          'Commission, sales tax and the exchange levies are not included. If you want the all-in cost per share, add the per-share charges to each price before entering it, or run the trade through the brokerage calculator first.',
          'Corporate actions change the arithmetic. A bonus issue increases the share count at no cost, and a split multiplies shares while dividing price. Adjust the lots for the action before comparing an old average with a new price.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'A weighted arithmetic mean of the prices paid, using the number of shares in each lot as the weight. The target-average solver rearranges the same equation for the unknown share count.',
    sourceExtra:
      'No statutory or exchange rate is used on this page. The result depends only on the prices and quantities you enter.',
    related: ['position-size-calculator', 'psx-brokerage-calculator', 'risk-reward-calculator'],
  },

  'position-size-calculator': {
    slug: 'position-size-calculator',
    category: 'psx-trading',
    metaTitle: 'Position Size Calculator | Risk per trade and stop-loss distance',
    metaDescription:
      'Work out how many PSX shares to buy from your account size, your risk budget and the distance to your stop. See the capital at risk and the position value.',
    title: 'Position Size Calculator',
    lede: 'The number of shares should come from the distance to your stop, not from how strongly you feel about the trade. Enter three figures and the size decides itself.',
    howTitle: 'The stop decides the size.',
    howBody:
      'Divide the amount you are willing to lose by the distance between your entry and your stop. That gives the number of shares at which hitting the stop costs exactly your risk budget, no more.',
    sections: [
      {
        heading: 'Risk is not the amount invested',
        paragraphs: [
          'A Rs 200,000 position with a stop 2% below the entry risks about Rs 4,000. The same Rs 200,000 with a stop 20% below risks Rs 40,000. The position value is identical and the risk is ten times larger.',
          'That is why sizing from position value alone goes wrong. The stop is the part of the trade that converts a price into a rupee loss, and it has to be chosen before the share count.',
        ],
      },
      {
        heading: 'Why one and two per cent is the usual range',
        paragraphs: [
          'At 1% risk, ten consecutive losses cost about a tenth of the account. At 10% risk, the same run costs two thirds, and recovering from that needs a much larger gain than the one that was lost.',
          'The right number depends on how often the method wins and on how much the account can lose without changing your behaviour. A smaller size that you can hold through a drawdown beats a larger one you abandon at the bottom.',
        ],
      },
      {
        heading: 'Gaps, locks and slippage',
        paragraphs: [
          'A stop is an instruction to your broker, not a guaranteed price. An opening gap can fill well below it, and a stock at its lower lock can have no buyers at all, which means the loss can exceed the risk budget.',
          'Size the position so that a worse exit than the one modelled is still survivable. The calculator shows the loss at the stop; the market decides whether you get that price.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Fixed-fractional sizing: the share count is the risk budget divided by the entry-to-stop distance, rounded down so the position never risks more than the budget.',
    sourceExtra:
      'Commission, sales tax and slippage are excluded. The PSX daily band of 10% or one rupee, whichever is higher, is described on the lock calculator.',
    related: ['risk-reward-calculator', 'psx-brokerage-calculator', 'stock-average-price-calculator'],
  },

  'risk-reward-calculator': {
    slug: 'risk-reward-calculator',
    category: 'psx-trading',
    metaTitle: 'Risk Reward & Stop Loss Calculator | Break-even win rate',
    metaDescription:
      'Calculate the risk-to-reward ratio of a PSX trade, the win rate it needs to break even, and its expectancy at your own hit rate.',
    title: 'Risk Reward & Stop Loss Calculator',
    lede: 'A two-to-one trade sounds good until you notice it only works one time in four. This tool puts the ratio and the hit rate it needs on the same screen.',
    howTitle: 'A ratio means nothing without a hit rate.',
    howBody:
      'The reward-to-risk ratio sets the minimum share of trades that must reach the target for the strategy to break even. Above that rate the setup makes money over many trades. Below it, the ratio is decoration.',
    sections: [
      {
        heading: 'The break-even hit rate',
        paragraphs: [
          'A 1:1 trade needs a 50% hit rate to break even. A 2:1 trade needs about 33%, and a 3:1 trade needs 25%. The formula is one divided by one plus the ratio, and it assumes every winner reaches the target and every loser exits at the stop.',
          'This is the number to compare with your actual record. If your last fifty trades reached the target less often than the break-even rate, the setup was losing money even when the ratio looked attractive.',
        ],
      },
      {
        heading: 'Expectancy turns the ratio into rupees',
        paragraphs: [
          'Expectancy is the average result per trade: the hit rate multiplied by the reward, minus the loss rate multiplied by the risk. A positive expectancy means the method makes money over a large number of trades, not that the next trade will.',
          'Multiplying expectancy by the rupee risk per trade gives an average profit or loss in rupees. That figure is more useful than a win rate on its own, because it combines both sides of the trade.',
        ],
      },
      {
        heading: 'Costs move the break-even point',
        paragraphs: [
          'Commission, sales tax and the exchange levies reduce every winner and increase every loser. A 2:1 ratio before costs can be closer to 1.8:1 after them, which raises the hit rate needed to break even.',
          'Capital gains tax applies to the profitable trades, so the net expectancy is lower again for a taxable account. Run the profit through the brokerage and CGT calculators before treating a ratio as real.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Break-even hit rate is 1 divided by 1 plus the reward-to-risk ratio. Expectancy is the hit rate times the ratio, minus the loss rate. Both are arithmetic, not forecasts.',
    sourceExtra:
      'No exchange or tax rate is used here. Costs and capital gains tax are described but not deducted.',
    related: ['position-size-calculator', 'psx-brokerage-calculator', 'pivot-point-calculator'],
  },

  'pivot-point-calculator': {
    slug: 'pivot-point-calculator',
    category: 'psx-trading',
    metaTitle: 'Pivot Point Calculator | Classic, Fibonacci, Camarilla, Woodie, DeMark',
    metaDescription:
      'Calculate PSX pivot points from the previous session high, low, close and open. Compare classic, Fibonacci, Camarilla, Woodie and DeMark levels.',
    title: 'Pivot Point Calculator',
    lede: 'One session of prices, five families of support and resistance. Pick the method your desk uses and see where the next session starts.',
    howTitle: 'Five families, one session of prices.',
    howBody:
      'Classic, Fibonacci and Woodie build on the average of high, low and close. Camarilla anchors to the close. DeMark chooses its formula from the relationship between the open and the close. The same inputs therefore produce different ladders.',
    sections: [
      {
        heading: 'What a pivot actually is',
        paragraphs: [
          'A pivot is a central price derived from the previous session, with levels projected above and below it. The idea is that the market often pauses or reverses near these levels because many participants are watching the same arithmetic.',
          'It is a description of where the last session traded, not a forecast. A pivot that holds is information. A pivot that fails is also information, and often the more useful of the two.',
        ],
      },
      {
        heading: 'Why the methods disagree',
        paragraphs: [
          'Camarilla uses the close as its centre and a much tighter set of levels, designed for mean-reversion trading within the session. DeMark produces a single resistance and a single support, and ignores the open unless it is needed to choose the formula.',
          'Mixing methods on one chart produces a crowd of lines that all look important and none of which are. Choose one family, apply it consistently, and judge it on a record rather than on a single session.',
        ],
      },
      {
        heading: 'How levels are used in practice',
        paragraphs: [
          'A common use is to frame a stop or a target: a long entered above the pivot might use the pivot itself or the first support as a reference for where the idea is wrong. The level is a decision point, not an entry signal.',
          'PSX prices are quoted in rupees and paisa, so a calculated level between ticks is not directly tradeable. Round it and treat the rounded price as the reference.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'The five formulas are the published definitions. No adjustment is made for gaps, corporate actions or the tick size, other than rounding the displayed price to the nearest paisa.',
    sourceExtra:
      'Pivot levels are conventions, not regulatory figures. Different charting platforms can round or smooth them slightly differently.',
    related: ['fibonacci-retracement-calculator', 'psx-circuit-lock-calculator', 'risk-reward-calculator'],
  },

  'fibonacci-retracement-calculator': {
    slug: 'fibonacci-retracement-calculator',
    category: 'psx-trading',
    metaTitle: 'Fibonacci Retracement Calculator | PSX swing levels and extensions',
    metaDescription:
      'Calculate Fibonacci retracement and extension levels between any swing high and low, with the distance from the current price.',
    title: 'Fibonacci Retracement Calculator',
    lede: 'Two turning points and a direction. The tool measures the swing, lays out the conventional ratios, and shows how far each level sits from the market.',
    howTitle: 'A proportion of the swing, measured from the end of the move.',
    howBody:
      'Retracement levels divide the swing range into the conventional proportions and measure back from the end of the move. Extensions project the same range beyond the swing in the direction of the trend.',
    sections: [
      {
        heading: 'Choosing the swing is the whole exercise',
        paragraphs: [
          'A Fibonacci tool does not decide which high and low matter. Two analysts can draw different swings on the same chart and both be internally consistent, which is why the levels are better treated as a shared language than as a discovery.',
          'Pick the swing that matches your holding period, and keep it fixed while the trade is open. Redrawing the swing after the price moves turns the tool into a way of justifying a position rather than measuring it.',
        ],
      },
      {
        heading: 'Retracement and extension are different questions',
        paragraphs: [
          'Retracement asks how much of the move has been given back, and the common answers are 38.2%, 50% and 61.8%. Extension asks where the next leg might reach if the trend continues, using 127.2%, 161.8% and beyond.',
          'The 50% level is not a Fibonacci ratio at all. It is included because traders watch it and because it is the midpoint of the swing, which makes it useful as a reference even for people who do not use the rest of the ladder.',
        ],
      },
      {
        heading: 'What the levels are not',
        paragraphs: [
          'They are not support or resistance in any mechanical sense. A price can pass through every level without pausing, and a level that held once can fail the next time. The ratios describe the swing, not the order book.',
          'PSX tick sizes mean a level between ticks is not directly tradeable. Round the level and use it to frame a decision, rather than placing an order exactly on a calculated price.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Retracements are the swing range multiplied by the conventional ratios and measured back from the end of the move. Extensions use ratios above one and project beyond the swing.',
    sourceExtra:
      'The ratios are a convention, not a regulatory or statistical standard. Results depend entirely on the swing you choose.',
    related: ['pivot-point-calculator', 'risk-reward-calculator', 'position-size-calculator'],
  },

  'psx-circuit-lock-calculator': {
    slug: 'psx-circuit-lock-calculator',
    category: 'psx-trading',
    metaTitle: 'PSX Upper & Lower Lock Calculator | Daily circuit breaker limits',
    metaDescription:
      'Calculate the PSX upper and lower lock for a stock from its previous close, using the daily price band and the rupee floor.',
    title: 'PSX Upper & Lower Lock Calculator',
    lede: 'The exchange puts a ceiling and a floor on each stock every session. Enter the previous close and see exactly where they sit, in rupees.',
    howTitle: 'A percentage of the close, with a rupee floor.',
    howBody:
      'The band is a percentage of the previous closing price. If the percentage produces a move smaller than the floor, the floor applies instead. That is why a very cheap stock can move by more than the stated percentage.',
    sections: [
      {
        heading: 'Why there is a floor',
        paragraphs: [
          'On a stock trading at Rs 3, a 10% band is 30 paisa. Without a floor, the price could be pinned by a single small order, so the Exchange applies a minimum rupee move as well as the percentage.',
          'The ready market uses a one-rupee floor and the odd lot market uses two rupees. Both use the same percentage band, which is 10% since July 2024. The band was raised in half-point steps from 7.5% over the preceding weeks.',
        ],
      },
      {
        heading: 'Upper lock and lower lock in practice',
        paragraphs: [
          'At the upper lock the price cannot rise further for the session, so buyers queue and sellers have little reason to sell. At the lower lock the reverse happens, and a position can be impossible to exit at any price.',
          'This is why a stop-loss is not a guarantee. If a stock opens at the lower lock, the stop can be filled far below the level you set, or not filled at all.',
        ],
      },
      {
        heading: 'The market-wide halt is separate',
        paragraphs: [
          'Scrip-wise locks apply to individual stocks. Separately, PSX can halt the whole market when the KSE-30 index moves 5% and holds that move for five minutes. The halt length and the reopening process are set by the Exchange.',
          'A halt does not change the lock prices. When trading resumes, each stock is still inside the band calculated from the same previous close.',
        ],
      },
    ],
    sources: ['psxRegulations'],
    sourceTitle: 'Rates and sources',
    sourceIntro:
      'Checked 13 November 2026. Regulation 19.3 of the PSX Regulations sets the scrip-wise circuit breaker. The band reached 10% on 22 July 2024 after a phased increase from 7.5%.',
    sourceExtra:
      'The Exchange can change the band and applies different treatment to some products, including exchange traded funds and the first trading day of a rights allotment. Confirm the current band on PSX before relying on a lock price.',
    related: ['psx-brokerage-calculator', 'position-size-calculator', 'pivot-point-calculator'],
  },

  'lumpsum-calculator': {
    slug: 'lumpsum-calculator',
    category: 'returns-growth',
    metaTitle: 'Lumpsum Investment Calculator | Future value and real value',
    metaDescription:
      'See what a one-time investment becomes at a chosen return, how much of it is growth, and what the final figure is worth after inflation.',
    title: 'Lumpsum Investment Calculator',
    lede: 'One amount, invested once and left alone. The tool shows the nominal result, the growth inside it, and what the money is worth in today’s prices.',
    howTitle: 'Compounding is the whole mechanism.',
    howBody:
      'The balance earns a return, and the following year that return earns a return as well. The frequency decides how often the addition happens inside the year, and the inflation rate converts the final figure back into today’s purchasing power.',
    sections: [
      {
        heading: 'Nominal and real are different answers',
        paragraphs: [
          'A 12% return during a year of 7% inflation is a real return of about 4.7%. The nominal figure is what the statement shows. The real figure is what the money can buy, and it is the one that matters when the goal is a house, an education or an income you can live on.',
          'The gap widens quickly. Over ten years, 7% inflation raises prices by about 97%, so a nominal doubling in that period is close to standing still in purchasing power. The calculator shows both numbers side by side because a single future value hides that.',
        ],
      },
      {
        heading: 'Frequency matters less than the rate',
        paragraphs: [
          'At 12% a year over ten years, monthly compounding produces about 6% more than annual compounding on the same starting amount. That is real, but it is small next to the difference between a 10% and a 12% return, which is closer to 22%.',
          'Most long-term projections use annual compounding because it is easier to compare. Use monthly when the product actually credits interest monthly, such as a savings account or a money market fund.',
        ],
      },
      {
        heading: 'What the figure leaves out',
        paragraphs: [
          'Tax, platform fees, fund expense ratios and exit loads all reduce the result. A 12% gross return can become a materially lower net return once those are deducted, and the drag compounds in the same way the return does.',
          'The path also matters. A constant 12% is a convenient average, but real returns arrive unevenly, and a large fall in the early years leaves less money working for the rest of the period. Treat the output as an illustration of the arithmetic, not a promise about a portfolio.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Future value is the starting amount multiplied by one plus the periodic rate, raised to the number of periods. The real value divides that result by one plus inflation, raised to the number of years.',
    sourceExtra:
      'No statutory or market rate is used on this page. The return and inflation figures are the ones you enter.',
    related: ['compounding-calculator', 'cagr-calculator', 'inflation-calculator'],
  },

  'cagr-calculator': {
    slug: 'cagr-calculator',
    category: 'returns-growth',
    metaTitle: 'CAGR Calculator | Compound annual growth rate and projections',
    metaDescription:
      'Calculate the compound annual growth rate between two values, project a future value from a target CAGR, or find the years needed to reach a target.',
    title: 'CAGR Calculator',
    lede: 'CAGR is the steady yearly rate that would take you from the first value to the last. It is a summary of the endpoints, not a description of the road between them.',
    howTitle: 'One rate that connects two endpoints.',
    howBody:
      'Divide the final value by the initial value, take the nth root for the number of years, and subtract one. The result is the constant rate that reproduces the end value, whatever happened in between.',
    sections: [
      {
        heading: 'It hides the path',
        paragraphs: [
          'A fund that goes from 100 to 50 and then to 200 has the same CAGR as one that climbs smoothly from 100 to 200. The ending value is identical. The experience is not, and neither is the drawdown an investor had to sit through.',
          'That is why CAGR is a comparison tool rather than a risk measure. Two investments with the same CAGR are not interchangeable if one took twice the fall to get there.',
        ],
      },
      {
        heading: 'CAGR is not your return',
        paragraphs: [
          'CAGR assumes a single amount at the start and a single amount at the end. If you added money every month, or took some out, the rate says nothing about the timing of those flows. XIRR is the measure for a portfolio with contributions.',
          'For a single buy and a single sell with no dividends in between, CAGR and XIRR agree. Once cash moves at different dates, they diverge, and the divergence can be large.',
        ],
      },
      {
        heading: 'Using it to compare',
        paragraphs: [
          'CAGR is most useful when the endpoints are clean and the periods are the same. Compare a fund with its benchmark over the same years, or compare a property with an equity portfolio over the same holding period.',
          'Then compare the result with inflation. A 15% CAGR over ten years during 10% inflation is about 4.5% real, which is a very different achievement from 15% during 4% inflation.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'CAGR is the final value divided by the initial value, raised to the power of one over the number of years, minus one. The projection and years-needed modes rearrange the same equation.',
    sourceExtra:
      'No statutory rate is used. The result depends only on the two values and the holding period you enter.',
    related: ['xirr-calculator', 'lumpsum-calculator', 'rule-of-72-calculator'],
  },

  'xirr-calculator': {
    slug: 'xirr-calculator',
    category: 'returns-growth',
    metaTitle: 'XIRR Calculator | Money-weighted return on dated cashflows',
    metaDescription:
      'Calculate XIRR from irregular investments, dividends and sales. Enter each dated cashflow and get the annualised money-weighted return.',
    title: 'XIRR Calculator',
    lede: 'XIRR is the annualised rate that makes the present value of every dated cashflow add up to zero. It is the return you actually earned, given when you put money in and when you took it out.',
    howTitle: 'Every cashflow is discounted to the same day.',
    howBody:
      'Each amount is moved back to the start date using its exact number of days and a trial rate. The solver searches for the rate at which money in equals money out in present-value terms. That rate is the XIRR.',
    sections: [
      {
        heading: 'Why the simple return misleads',
        paragraphs: [
          'Put in 150,000 across two years, then take out 180,000 at the end of the third, and the simple return is 20%. Because the later contributions had much less time to work, the annualised return is closer to 7.4%.',
          'XIRR accounts for that timing. It is the number to compare with a savings rate, a fund’s published return or the inflation rate, because all of those are annual figures.',
        ],
      },
      {
        heading: 'The sign convention',
        paragraphs: [
          'Money leaving your pocket is negative: a purchase, a fee, a monthly contribution. Money arriving is positive: a sale, a dividend, a withdrawal. At least one of each is needed, otherwise there is no return to solve for.',
          'Enter the amount on the date it actually moved. A dividend received in March and reinvested in April is two cashflows, not one, and the difference changes the answer slightly.',
        ],
      },
      {
        heading: 'What XIRR cannot do',
        paragraphs: [
          'It ignores tax unless you include the tax in the cashflow. It is sensitive to dates, so a typo in a year can move the result by a lot. And with cashflows that alternate between positive and negative many times, more than one rate can satisfy the equation; the tool returns one of them.',
          'For a simple buy and hold with no income, use CAGR. For anything with contributions, dividends or partial sales, XIRR is the honest measure.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'XIRR is solved by bisection on the net present value of the dated cashflows, using exact day counts and a 365-day year. The search runs between minus 99.99% and 1,000%.',
    sourceExtra:
      'No statutory rate is used. The result depends only on the dates and amounts you enter.',
    related: ['cagr-calculator', 'roi-calculator', 'swp-calculator'],
  },

  'rule-of-72-calculator': {
    slug: 'rule-of-72-calculator',
    category: 'returns-growth',
    metaTitle: 'Rule of 72 Calculator | Doubling time and required return',
    metaDescription:
      'How long an investment takes to double at a given return, the rate needed to double in a set number of years, and how far the rule of 72 drifts from the exact answer.',
    title: 'Rule of 72 Calculator',
    lede: 'Divide 72 by the annual return and you get the approximate number of years to double. The exact answer comes from logarithms, and the gap between the two is worth knowing.',
    howTitle: 'A shortcut with a known error.',
    howBody:
      'The exact doubling time is the natural logarithm of two divided by the logarithm of one plus the rate. The rule of 72 replaces that with a division, which is close around 6% to 10% and drifts as the rate moves away.',
    sections: [
      {
        heading: 'Where the 72 comes from',
        paragraphs: [
          'Seventy-two has many divisors, including 1, 2, 3, 4, 6, 8, 9 and 12, so the division is easy without a calculator. That convenience is the only reason it is 72 rather than a more precise constant.',
          'The mathematically derived constant for continuous compounding is about 69.3. Using 72 instead corrects for the discrete annual compounding people usually mean, and it happens to be more accurate around the rates most savers actually see.',
        ],
      },
      {
        heading: 'When it drifts',
        paragraphs: [
          'At 2% a year, the exact doubling time is 35.0 years and the rule gives 36. At 20%, the exact figure is 3.8 years and the rule gives 3.6. At 50%, the exact figure is 1.7 years and the rule gives 1.4.',
          'The error is small in the middle of the range and grows at both ends. Use the shortcut for a quick sense of scale, and the exact figure when the number is going into a plan.',
        ],
      },
      {
        heading: 'Doubling is not the whole story',
        paragraphs: [
          'Two doublings is four times your money, and three is eight times. At 12% a year, money doubles in about 6.1 years, so 18 years is roughly eight times the starting amount before inflation and costs.',
          'Inflation doubles prices on the same arithmetic. If prices double in the time your money doubles, the real gain is zero. That is why the real doubling time, using the return after inflation, is usually the more useful number.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Exact doubling time is ln(2) divided by ln(1 plus the rate). The rule of 72 estimate is 72 divided by the percentage rate, and the rule of 69.3 estimate is 69.3 divided by the percentage rate.',
    sourceExtra:
      'No statutory rate is used. The rule of 72 is a convention, not a regulatory or statistical standard.',
    related: ['cagr-calculator', 'lumpsum-calculator', 'inflation-calculator'],
  },

  'swp-calculator': {
    slug: 'swp-calculator',
    category: 'returns-growth',
    metaTitle: 'SWP Calculator | Systematic withdrawals and corpus longevity',
    metaDescription:
      'Work out how long a corpus lasts when you withdraw a fixed amount every month, how much you can withdraw safely, and the balance path year by year.',
    title: 'SWP Calculator',
    lede: 'A systematic withdrawal plan turns a corpus into a monthly income. The question is not whether it works this year, but whether it still works in year fifteen.',
    howTitle: 'Each month, return first, withdrawal second.',
    howBody:
      'The balance earns one month of the annual return, then the withdrawal leaves. The tool applies that order consistently, stops when the balance reaches zero, and also reports the fixed withdrawal that would exactly exhaust the corpus at the horizon.',
    sections: [
      {
        heading: 'Sequence risk',
        paragraphs: [
          'A bad market early in a drawdown hurts more than the same bad market later, because withdrawals during the fall lock in the loss and leave fewer units to recover. A constant return assumption cannot show that, and it makes every plan look smoother than it will be.',
          'This is why a plan that survives on a 10% average can still fail. The average is not the problem. The order of the returns is.',
        ],
      },
      {
        heading: 'The sustainable withdrawal',
        paragraphs: [
          'For a 5 million corpus at 10% over 20 years, the fixed monthly amount that exactly exhausts the money is about 46,800. Withdraw more and the balance runs out early. Withdraw less and something remains at the end.',
          'The sustainable figure is not a recommendation. It is the break-even point of one assumption set. Change the return or the horizon and it moves, often by more than people expect.',
        ],
      },
      {
        heading: 'Inflation is the missing variable',
        paragraphs: [
          'A fixed withdrawal loses purchasing power every year. At 7% inflation, 50,000 a month is worth about 25,000 in today’s terms after ten years, even though the bank credit stays the same.',
          'Real plans either raise the withdrawal each year or start below the sustainable figure to leave room for that increase. The tool models the fixed case, so treat the surplus it shows as the budget for those raises.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'The simulation compounds the balance by the monthly equivalent of the annual return, subtracts the withdrawal, and repeats until the balance reaches zero or the horizon ends. The sustainable withdrawal is the closed-form inverse of that process.',
    sourceExtra:
      'No statutory rate is used. The monthly return is derived from the annual figure you enter, and tax, fees and inflation are not deducted.',
    related: ['sip-calculator', 'lumpsum-calculator', 'inflation-calculator'],
  },

  'inflation-calculator': {
    slug: 'inflation-calculator',
    category: 'returns-growth',
    metaTitle: 'Inflation Calculator Pakistan | Future cost and purchasing power',
    metaDescription:
      'Move an amount forward at a chosen inflation rate, discount a future amount back to today, or convert between two CPI index readings from Pakistan.',
    title: 'Inflation Calculator Pakistan',
    lede: 'Inflation is the rate at which the same basket of goods costs more. This tool moves an amount forward at a rate you choose, or between two CPI readings you supply.',
    howTitle: 'A ratio, applied in one direction or the other.',
    howBody:
      'At a constant rate, an amount grows by one plus the rate each year. Discounting reverses it. With CPI numbers, the ratio of the two index readings does the same job, and the base year cancels out.',
    sections: [
      {
        heading: 'The rate is an assumption',
        paragraphs: [
          'Pakistan’s inflation has ranged widely, and a single rate cannot describe a decade. The tool does not forecast it. Use a rate you can defend, then test a higher one to see how much the answer moves.',
          'For a long plan, a range is more honest than a point estimate. The difference between 7% and 10% over twenty years is large enough to change what you can afford.',
        ],
      },
      {
        heading: 'CPI readings, not percentages',
        paragraphs: [
          'The CPI mode needs two index numbers from the same series, not two year-on-year percentages. Copy the index from the monthly release and enter both readings. Only the ratio matters, so the base year cancels out.',
          'The Pakistan Bureau of Statistics publishes the monthly CPI and the index numbers behind it. The calculator does not bundle a series, because a stale copy would be worse than no copy at all.',
        ],
      },
      {
        heading: 'Why the basket matters',
        paragraphs: [
          'CPI is an average across households. Your personal inflation depends on what you buy: food, rent, school fees, fuel and health can move differently from the headline, and the weights change over time.',
          'Use the headline as a starting point, not a verdict. If your large costs are rising faster than the index, plan with a higher rate than the one in the news.',
        ],
      },
    ],
    sources: ['pbsCpi'],
    sourceTitle: 'Rates and sources',
    sourceIntro:
      'The calculator does not bundle a CPI series. It uses the two index numbers you enter, taken from the monthly releases published by the Pakistan Bureau of Statistics.',
    sourceExtra:
      'Checked 13 November 2026. CPI base years have changed over time, so use two readings from the same series. Only the ratio matters, which means the base year cancels out.',
    related: ['lumpsum-calculator', 'cagr-calculator', 'swp-calculator'],
  },

  'dividend-income-calculator': {
    slug: 'dividend-income-calculator',
    category: 'dividends-corporate-actions',
    metaTitle: 'Dividend Income Calculator Pakistan | Net income after tax',
    metaDescription:
      'Add up dividend income across your PSX holdings, apply withholding tax, and see the net amount per payout and across the year.',
    title: 'Dividend Income Calculator',
    lede: 'A portfolio of dividend payers is an income plan only if you know what reaches the account. Add the holdings, set the withholding rate, and see the net figure.',
    howTitle: 'Gross, tax, net, then the timing.',
    howBody:
      'Each holding contributes shares multiplied by dividend per share. The tool adds them, applies the withholding rate once across the total, and divides the net amount by the number of payouts you expect.',
    sections: [
      {
        heading: 'Gross is not what arrives',
        paragraphs: [
          'Dividend withholding is deducted before the cash reaches your account. For a listed company the common rate is 15% for a filer and 30% for a non-filer, and the company deducts it at source.',
          'The rate depends on the payer as well as on your status. An IPP pays 7.5% to a filer, a debt fund pays 25%, and a company with exempt income or losses pays 25%. A single rate across a mixed portfolio is a planning shortcut, not a tax return.',
        ],
      },
      {
        heading: 'A single rate is a planning shortcut',
        paragraphs: [
          'This tool applies one rate to the portfolio total. That is useful for a rough income plan and wrong for a mixed set of payers. If you hold IPPs, funds and listed companies together, run each dividend through the dividend tax calculator and add the net figures.',
          'The same applies to your ATL status. It can change during the year, and the rate on the payment date is the one that counts.',
        ],
      },
      {
        heading: 'Dividends are not a salary',
        paragraphs: [
          'A company can cut, skip or pay a dividend in shares. A high yield can be a sign that the price has fallen because the market expects a cut. Build the plan on the lowest dividend you can defend, not the highest of the last five years.',
          'The tool also assumes every holding pays the annual amount you enter. That is a useful baseline, but it is not a forecast, and it does not account for the timing of the cash within the year.',
        ],
      },
    ],
    sources: ['whtCard', 'financeAct2026', 'ordinance'],
    sourceTitle: 'Rates and sources',
    sourceIntro:
      'Checked 13 November 2026. Section 150 of the Income Tax Ordinance sets withholding on dividends. The default is 15% for a listed company dividend for a filer.',
    sourceExtra:
      'A non-filer pays 30% on the same dividend. An IPP pays 7.5% to a filer, a debt fund 25%, and a company with exempt income or losses 25%. The dividend tax calculator covers each payer type.',
    related: ['dividend-tax-calculator', 'dividend-yield-calculator', 'drip-calculator'],
  },

  'dividend-yield-calculator': {
    slug: 'dividend-yield-calculator',
    category: 'dividends-corporate-actions',
    metaTitle: 'Dividend Yield Calculator PSX | Yield and yield on cost',
    metaDescription:
      'Calculate dividend yield from the share price and annual dividend, convert a PSX dividend declared as a percentage of face value, and see yield on your original cost.',
    title: 'Dividend Yield Calculator',
    lede: 'Yield is the annual dividend divided by the price. PSX companies often declare the dividend as a percentage of face value, which is a different number. This tool handles both.',
    howTitle: 'Two prices, two yields.',
    howBody:
      'Current yield divides the annual dividend by today’s price. Yield on cost divides the same dividend by what you paid. The first tells you what a new buyer gets; the second tells you what your own holding earns.',
    sections: [
      {
        heading: 'Face value is not market price',
        paragraphs: [
          'A 100% dividend on a Rs 10 face value share is Rs 10 per share. On a share trading at Rs 100 that is a 10% yield, not 100%. The percentage mode converts the declaration into rupees before calculating, so the two numbers do not get mixed up.',
          'Most PSX shares have a face value of Rs 10, but check the company’s notice. A few have a different face value, and the conversion changes with it.',
        ],
      },
      {
        heading: 'Yield on cost and current yield diverge',
        paragraphs: [
          'If you bought at Rs 50 and the price is now Rs 100, an Rs 8 dividend is 16% on cost and 8% on the current price. Neither is wrong. The first describes your own result; the second describes what a new buyer would get.',
          'Yield on cost is useful for reviewing a holding you already own. Current yield is useful for comparing two shares today. Do not use one to answer the other question.',
        ],
      },
      {
        heading: 'A high yield is a question, not an answer',
        paragraphs: [
          'The price may have fallen because the dividend is at risk. A yield of 20% on a company that is about to cut its payout is not income; it is a warning. Check the payout ratio, the earnings and the cash flow before treating the yield as a plan.',
          'The tool uses the last declared annual dividend. It does not know whether the next one will be higher, lower or cancelled, and it does not deduct withholding tax from the cash you receive.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Current yield is the annual dividend per share divided by the current price. Yield on cost uses the original cost per share as the denominator. The percentage mode multiplies face value by the declared percentage, then divides by 100.',
    sourceExtra:
      'No statutory or market rate is used. The result depends only on the price, the dividend and the cost you enter.',
    related: ['dividend-income-calculator', 'dividend-tax-calculator', 'drip-calculator'],
  },

  'drip-calculator': {
    slug: 'drip-calculator',
    category: 'dividends-corporate-actions',
    metaTitle: 'DRIP Calculator Pakistan | Dividend reinvestment compounding',
    metaDescription:
      'See how reinvesting dividends and growing payouts compounds a PSX holding, and what taking the cash instead would be worth.',
    title: 'Dividend Reinvestment (DRIP) Calculator',
    lede: 'Reinvesting a dividend buys more shares, and those shares pay the next dividend. The difference between reinvesting and taking the cash is small in year one and large in year fifteen.',
    howTitle: 'Each payout buys shares at the price on the day.',
    howBody:
      'The net dividend is divided by the share price to buy more shares. The payout then grows at its own rate, the price grows at another, and the next dividend is paid on the larger share count.',
    sections: [
      {
        heading: 'The share count does the work',
        paragraphs: [
          'A dividend that grows 5% on a fixed share count rises in a straight line. Reinvestment makes it compound, because each payout buys shares that pay the next payout. The later years contribute far more than the early ones.',
          'That is why the comparison with taking the cash is worth seeing. The gap is not the total dividends received. It is the dividends those dividends would have earned if they had stayed invested.',
        ],
      },
      {
        heading: 'DRIP is not automatic on PSX',
        paragraphs: [
          'Most PSX companies pay cash rather than operating a reinvestment plan. You reinvest by buying more shares with the cash, and the brokerage commission on that purchase is not in this model. Some funds offer a reinvestment option; check the terms and any discount.',
          'A real plan may buy whole shares and carry the remainder as cash. This model allows fractional shares, which slightly overstates the final share count for a small holding.',
        ],
      },
      {
        heading: 'The assumptions are doing a lot',
        paragraphs: [
          'Constant dividend growth, constant price growth, no fees and no taxes beyond withholding. Change one of those and the result moves, often by more than people expect. The tool is for comparing scenarios, not for predicting a balance.',
          'A dividend cut is the assumption that matters most. If the payout falls in year three, the later reinvestment never happens, and no growth rate in the model can repair it.',
        ],
      },
    ],
    sources: ['whtCard', 'financeAct2026', 'ordinance'],
    sourceTitle: 'Rates and sources',
    sourceIntro:
      'Checked 13 November 2026. Section 150 sets withholding on dividends. The default is 15% for a listed company dividend for a filer.',
    sourceExtra:
      'The tax rate is editable because the payer and your ATL status change it. The model reinvests the net dividend, not the gross amount.',
    related: ['dividend-income-calculator', 'dividend-yield-calculator', 'compounding-calculator'],
  },

  'right-shares-calculator': {
    slug: 'right-shares-calculator',
    category: 'dividends-corporate-actions',
    metaTitle: 'Right Shares Calculator PSX | Ex-rights price and subscription cost',
    metaDescription:
      'Calculate the theoretical ex-rights price, the cost of subscribing and the value of the rights from the company’s rights issue terms.',
    title: 'Right Shares Calculator',
    lede: 'A rights issue offers you new shares below the market price. The old shares adjust down by roughly the value of the rights, so the arithmetic is a transfer, not a windfall.',
    howTitle: 'Old value plus new money, divided by the larger share count.',
    howBody:
      'Add the market value of your existing holding to the cash you would pay for the new shares, then divide by the total shares after the issue. That is the theoretical ex-rights price.',
    sections: [
      {
        heading: 'Why the price falls on the ex-rights date',
        paragraphs: [
          'The company now has more shares and the new cash. The theoretical price reflects both. The fall is not a loss; it is the value of the rights separating from the old share.',
          'The value of the rights is the difference between the cum-rights price and the theoretical ex-rights price. It belongs to the holder on the record date, whether or not they subscribe.',
        ],
      },
      {
        heading: 'Exercise or sell the rights',
        paragraphs: [
          'Before costs and tax, exercising and selling the rights are theoretically equivalent. Exercising puts more money into the same company and preserves your ownership share. Selling takes the value in cash and leaves you with a smaller stake.',
          'The real question is whether the company can use the new money well. A rights issue at a deep discount can still be a poor investment if the proceeds fund a business that does not earn a return.',
        ],
      },
      {
        heading: 'The theoretical price is not the market price',
        paragraphs: [
          'The market can price the new money differently, especially when the use of the proceeds is uncertain. The actual ex-rights price may be above or below the theoretical figure.',
          'The record date, renunciation, brokerage fees and the tax treatment of any gain are outside this calculation. Read the company’s rights notice for the binding terms.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'The theoretical ex-rights price is the existing holding value plus the subscription cost, divided by the total shares after the issue. The value of the rights is the cum-rights price minus the theoretical ex-rights price, multiplied by the shares held.',
    sourceExtra:
      'No statutory rate is used. The result depends on the issue terms and the market price you enter.',
    related: ['bonus-split-calculator', 'stock-average-price-calculator', 'dividend-yield-calculator'],
  },

  'bonus-split-calculator': {
    slug: 'bonus-split-calculator',
    category: 'dividends-corporate-actions',
    metaTitle: 'Bonus Shares & Stock Split Calculator PSX | Adjusted price and cost',
    metaDescription:
      'Calculate the new share count, adjusted price and adjusted average cost after a bonus issue or stock split.',
    title: 'Bonus Shares & Stock Split Calculator',
    lede: 'A bonus issue gives you more shares. A split replaces each share with several. In both cases the price adjusts, and the value of the holding does not change on the day.',
    howTitle: 'More shares, lower price, same value.',
    howBody:
      'Multiply the share count by the adjustment factor and divide the price by the same factor. The total cost stays the same, so the average cost per share falls in proportion.',
    sections: [
      {
        heading: 'A bonus issue is not free money',
        paragraphs: [
          'The company converts reserves into shares. The share count rises, the price adjusts, and the total value is unchanged. Treating the new shares as a gain is the most common mistake in the category.',
          'What does change is the number of units that will receive future dividends. A larger share count at a lower price can produce the same total income, not more.',
        ],
      },
      {
        heading: 'Splits and bonuses are the same arithmetic',
        paragraphs: [
          'A two for one split is a factor of 2. A one for five bonus is a factor of 1.2. The labels differ, and the accounting behind them differs, but the effect on your holding is the same: more shares, a lower price, the same value.',
          'The tool does not round to whole shares. A bonus ratio that produces a fraction is left as a fraction, because the company’s own rounding rule is not part of the arithmetic.',
        ],
      },
      {
        heading: 'What changes is the cost basis',
        paragraphs: [
          'Your total cost stays the same, spread over more shares. That matters when you sell, because capital gains are calculated from the adjusted cost per share. The tool shows the adjusted figure but does not calculate the tax.',
          'Keep the company’s notice with your records. A future sale may need the original cost, the event date and the ratio to reconstruct the adjusted cost basis.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'The adjustment factor is the number of shares after the event for each share held before it. For a bonus issue it is one plus the bonus ratio; for a split it is the new shares per old share. The price and the cost per share are divided by that factor.',
    sourceExtra:
      'No statutory rate is used. The result depends only on the shares, prices and ratio you enter.',
    related: ['right-shares-calculator', 'stock-average-price-calculator', 'psx-capital-gains-tax-calculator'],
  },

  'dcf-calculator': {
    slug: 'dcf-calculator',
    category: 'stock-valuation',
    metaTitle: 'DCF Calculator Pakistan | Intrinsic value per share',
    metaDescription:
      'Value a PSX stock with discounted free cash flow, a terminal growth rate and net debt, and see the margin of safety against the market price.',
    title: 'Intrinsic Value (DCF) Calculator',
    lede: 'A DCF turns a cash-flow forecast into a value per share. The arithmetic is simple; the assumptions are the hard part. Change them and watch the answer move.',
    howTitle: 'Forecast the cash, discount it, then subtract net debt.',
    howBody:
      'Each year of free cash flow to the firm is discounted at the rate you require. The final year is grown once more at terminal growth and valued as a perpetuity. Enterprise value less net debt is equity value, divided by the shares.',
    sections: [
      {
        heading: 'The discount rate does most of the work',
        paragraphs: [
          'A discount rate is the return you demand for waiting and for risk. Move it by one percentage point and the value can change by 10% or more. A rate that looks conservative because it is low is not conservative at all; it is a larger assumption about the future.',
          'Use a rate you can defend against alternatives. For a listed company, the weighted average cost of capital is the usual starting point, and the cost of equity is the right rate when you are valuing the shares rather than the whole business.',
        ],
      },
      {
        heading: 'The terminal value is most of the answer',
        paragraphs: [
          'In a five-year forecast, the terminal value often carries 60% to 80% of the total. It assumes the business grows at a constant rate forever, which is a strong claim about a company that has not yet survived the next five years.',
          'Terminal growth should sit below long-run nominal growth in the economy. If the model needs a high terminal rate to produce a reasonable value, the answer is telling you that the explicit forecast is doing too little work.',
        ],
      },
      {
        heading: 'What a DCF cannot see',
        paragraphs: [
          'It does not price optionality, a turn in the cycle, a change in the capital structure or the quality of the accounting. It also cannot tell you whether the cash flow is sustainable, because that is a question about the business rather than the formula.',
          'Treat the output as a range, not a price target. Run a lower growth case and a higher discount rate, and ask whether the stock still looks attractive at the bottom of the range.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Free cash flow to the firm is discounted at the chosen rate. The terminal value uses the final forecast year, grown once at terminal growth, and is discounted back. Equity value is enterprise value less net debt.',
    sourceExtra:
      'No market or statutory rate is used. The result depends only on the cash flow, growth, discount rate, terminal growth, net debt and share count you enter.',
    related: ['graham-number-calculator', 'pe-ratio-calculator', 'dividend-discount-calculator'],
  },

  'graham-number-calculator': {
    slug: 'graham-number-calculator',
    category: 'stock-valuation',
    metaTitle: 'Graham Number Calculator PSX | EPS and book value',
    metaDescription:
      'Calculate Benjamin Graham’s number from earnings and book value per share, and see the upside or downside against the current PSX price.',
    title: 'Graham Number Calculator',
    lede: 'The Graham number is a ceiling built from two conservative rules: no more than 15 times earnings and no more than 1.5 times book value. It is a screen, not a verdict.',
    howTitle: 'Two ceilings, one geometric mean.',
    howBody:
      'Multiply 15 times earnings per share and 1.5 times book value per share, multiply the two results together, and take the square root. The answer sits between the two ceilings.',
    sections: [
      {
        heading: 'What the number is trying to do',
        paragraphs: [
          'Benjamin Graham wanted a defensive investor to buy a company at a price that already allowed for error. The 15 times earnings limit and the 1.5 times book value limit are two ways of asking for that room.',
          'The square root combines them, so a stock is below the Graham number only when it is cheap on both earnings and book value at the same time. A low P/E alone does not qualify.',
        ],
      },
      {
        heading: 'Why it can mislead on PSX',
        paragraphs: [
          'Book value is an accounting figure. For an asset-light business, it can be tiny and the Graham number will be low even when the company is excellent. For a company with old property, book value can be far below the market value of the assets.',
          'One-off earnings also distort the result. A gain on a property sale or a favourable exchange-rate movement can make a single year look cheap. Use a representative year, and check that the equity on the balance sheet is real.',
        ],
      },
      {
        heading: 'Use it as a first filter',
        paragraphs: [
          'The Graham number says nothing about debt, cash flow, competitive advantage or management. It is a quick way to find companies that are not obviously expensive on two old measures, not a reason to buy any of them.',
          'Pair it with the DCF and the comparison tool, and read the latest accounts. A stock below the Graham number can still be a value trap.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'The Graham number is the square root of 22.5 times earnings per share times book value per share, where 22.5 is 15 times 1.5. The current P/E and P/B use the price you enter.',
    sourceExtra:
      'No statutory rate is used. The result depends only on the earnings, book value and price you enter.',
    related: ['dcf-calculator', 'pe-ratio-calculator', 'compare-psx-stocks'],
  },

  'pe-ratio-calculator': {
    slug: 'pe-ratio-calculator',
    category: 'stock-valuation',
    metaTitle: 'P/E Ratio Calculator Pakistan | Fair price and PEG',
    metaDescription:
      'Calculate P/E, earnings yield, PEG and the share price implied by a target P/E for a PSX stock.',
    title: 'P/E Ratio & Fair Price Calculator',
    lede: 'P/E is the price you pay for one rupee of annual earnings. It is useful only when you know what the earnings are and what growth you are paying for.',
    howTitle: 'Invert the multiple, then put it next to growth.',
    howBody:
      'P/E is price divided by earnings per share. The earnings yield is the inverse. PEG divides the P/E by the expected growth rate, and the target multiple turns earnings into a price.',
    sections: [
      {
        heading: 'Cheap and expensive are relative',
        paragraphs: [
          'A P/E of 8 is cheap for a fast-growing consumer business and expensive for a cyclical steel producer at the top of its cycle. The multiple has to be read against the sector, the growth, the debt and the quality of the earnings.',
          'A low P/E can be a warning that the market expects the earnings to fall. A high P/E can be a claim that the earnings will grow into the price. Neither is a conclusion on its own.',
        ],
      },
      {
        heading: 'Earnings are an accounting number',
        paragraphs: [
          'Depreciation, one-off gains, related-party transactions and changes in accounting policy all move earnings per share. A P/E built on a flattered year is lower than it looks.',
          'Use a normalised figure where you can, and check the cash flow statement. If the company reports profits but no cash, the multiple is not measuring what you think it is.',
        ],
      },
      {
        heading: 'The target multiple is your assumption',
        paragraphs: [
          'The fair value in this tool is earnings per share times the target P/E you choose. The range around it is a 10% band, not a confidence interval. The market can pay a different multiple for years.',
          'PEG is a shortcut, not a law. It assumes growth is the only thing that matters, and it treats a high growth rate as durable. Use it to compare companies, not to certify one.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'P/E is the share price divided by earnings per share. Earnings yield is EPS divided by price. PEG is P/E divided by the expected annual growth rate as a percentage. Fair value is EPS times the target P/E.',
    sourceExtra:
      'No statutory or market rate is used. The result depends only on the price, earnings, growth and target multiple you enter.',
    related: ['graham-number-calculator', 'dcf-calculator', 'compare-psx-stocks'],
  },

  'dividend-discount-calculator': {
    slug: 'dividend-discount-calculator',
    category: 'stock-valuation',
    metaTitle: 'Dividend Discount Model Calculator Pakistan | Gordon and two-stage',
    metaDescription:
      'Value a dividend-paying PSX stock with Gordon growth and a two-stage dividend discount model, and see the return implied by the current price.',
    title: 'Dividend Discount Model Calculator',
    lede: 'A dividend discount model values a stock as the present value of the dividends it will pay. Gordon growth assumes one rate forever; the two-stage model gives the payout a faster start.',
    howTitle: 'Discount the dividends, then value the perpetuity.',
    howBody:
      'The first stage grows the dividend at the high rate for a set number of years and discounts each payment. The remaining stream is valued as a growing perpetuity at stable growth and discounted back to today.',
    sections: [
      {
        heading: 'The model is a perpetuity, not a forecast',
        paragraphs: [
          'The terminal value usually carries most of the answer, and it assumes the dividend grows at a constant rate forever. Small changes in the required return or stable growth move the value a long way.',
          'The required return must be above stable growth. At or below it, the perpetuity has no finite value, which is the arithmetic telling you the assumptions are not sustainable.',
        ],
      },
      {
        heading: 'Dividends are a board decision',
        paragraphs: [
          'A company can cut or skip a dividend. The model treats the payout as a smooth stream, but real boards respond to cash flow, debt covenants and the investment opportunities in front of them.',
          'Check the payout ratio and the cash flow that supports it. A high dividend yield can be a sign that the market expects a cut, not a gift.',
        ],
      },
      {
        heading: 'What the model leaves out',
        paragraphs: [
          'Buybacks, special dividends, withholding tax and a control premium are outside the arithmetic. So is the possibility that the company retains cash and reinvests it at a return above the cost of equity.',
          'The model fits stable, mature payers best. For a company that pays no dividend, or one whose payout is about to change, use a cash-flow model instead.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'Gordon growth value is the current dividend times one plus stable growth, divided by the required return minus stable growth. The two-stage model discounts the high-growth dividends and adds the present value of the terminal perpetuity. Implied returns are solved from the current price.',
    sourceExtra:
      'No statutory or market rate is used. The result depends only on the dividend, price, required return and growth rates you enter.',
    related: ['dividend-yield-calculator', 'dcf-calculator', 'dividend-income-calculator'],
  },

  'shariah-compliance-checker': {
    slug: 'shariah-compliance-checker',
    category: 'stock-valuation',
    metaTitle: 'Shariah Compliance Checker PSX | Screening ratios',
    metaDescription:
      'Test a PSX company against the published Shariah financial screens: debt, non-compliant investments and income, illiquid assets and net liquid assets per share.',
    title: 'Shariah Compliance Checker',
    lede: 'A Shariah screen is two tests: what the company does, and whether its balance sheet stays within the published financial limits. This tool applies the PSX criteria to the figures you enter.',
    howTitle: 'The business screen first, then five financial ratios.',
    howBody:
      'The core activity must be permissible. Then interest-bearing debt, non-compliant investments, non-compliant income, illiquid assets and the price against net liquid assets per share are each tested against the published threshold.',
    sections: [
      {
        heading: 'The thresholds are published, not invented',
        paragraphs: [
          'PSX publishes five financial screens under the SECP-approved methodology: interest-bearing debt below 33% of total assets, non-compliant investments below 33% of total assets, non-compliant income below 5% of total revenue, illiquid assets at least 25% of total assets, and the share price at or above net liquid assets per share.',
          'The compliant list is revised twice a year, on 15 May and 15 November. A newly listed company that meets the criteria joins from its listing date, so the published list can change between reviews.',
        ],
      },
      {
        heading: 'A screen is not a fatwa',
        paragraphs: [
          'The tool applies arithmetic to the figures you enter. It does not verify the business description, the accounting treatment or the source of every income line. Those are judgements, and the company’s disclosures and the PSX list are the authoritative sources.',
          'A company can pass every ratio and still be excluded because of its core activity. The business screen is not a formality; it is the first test.',
        ],
      },
      {
        heading: 'What to do with the result',
        paragraphs: [
          'If a company fails a financial screen, the usual response is to avoid adding to the position and to review the holding. If it passes, the non-compliant income share is the figure used to purify the dividend.',
          'Purification is a separate calculation: the non-compliant income ratio multiplied by the dividend received. The dividend purification calculator does that step, and the PSX index notice publishes the ratio for each company.',
        ],
      },
    ],
    sources: ['psxShariah'],
    sourceTitle: 'Screening criteria and source',
    sourceIntro:
      'Checked 13 November 2026. The thresholds are the PSX financial screens under the SECP-approved methodology: interest-bearing debt below 33% of total assets, non-compliant investments below 33%, non-compliant income below 5% of total revenue, illiquid assets at least 25%, and price at or above net liquid assets per share.',
    sourceExtra:
      'PSX revises the Shariah-compliant list twice a year, on 15 May and 15 November. A company can pass the ratios and still fail the business screen, and the published list is the authoritative source.',
    related: ['dividend-purification-calculator', 'compare-psx-stocks', 'dcf-calculator'],
  },

  'compare-psx-stocks': {
    slug: 'compare-psx-stocks',
    category: 'stock-valuation',
    metaTitle: 'Compare PSX Stocks | P/E, P/B, yield and ROE side by side',
    metaDescription:
      'Compare two to four PSX stocks on P/E, P/B, dividend yield and return on equity using the figures you enter.',
    title: 'Compare PSX Stocks',
    lede: 'A comparison is only useful when the numbers are on the same basis. Put two to four companies side by side on the four measures that matter most, and see which one leads each.',
    howTitle: 'Four ratios, one table.',
    howBody:
      'P/E and P/B compare the price with earnings and book value. Dividend yield compares the payout with the price. Return on equity compares earnings with the capital shareholders have left in the business.',
    sections: [
      {
        heading: 'Lower is not always better',
        paragraphs: [
          'A lower P/E or P/B is cheaper on that measure, and a higher dividend yield or return on equity is stronger. But a low multiple can signal that the market expects the earnings to fall, and a high yield can signal that the dividend is about to be cut.',
          'The table marks the best value in each row. It does not tell you which stock is the better investment, because the cheapest company can be cheap for a reason.',
        ],
      },
      {
        heading: 'The inputs have to be comparable',
        paragraphs: [
          'Use the same period for every company. A trailing P/E for one stock and a forward P/E for another is not a comparison. Use the same share count and the same accounting basis, and normalise one-off items where you can.',
          'A negative EPS or book value makes the ratio unavailable, not zero. The tool shows n/a rather than a misleading number.',
        ],
      },
      {
        heading: 'A table is a starting point',
        paragraphs: [
          'Debt, cash, growth, competitive position and management quality are not in these four ratios. A company can lead on every row and still be the wrong investment at the current price.',
          'Use the comparison to decide which companies deserve more work, then read the accounts and run a cash-flow model. The tool compares only the figures you enter; it does not fetch live prices or reported statements.',
        ],
      },
    ],
    sources: [],
    sourceTitle: 'Method',
    sourceIntro:
      'P/E is price divided by EPS, P/B is price divided by book value per share, dividend yield is dividend per share divided by price, and return on equity is EPS divided by book value per share. The best value in each row is marked.',
    sourceExtra:
      'No market or statutory rate is used. The comparison depends only on the figures you enter for each stock.',
    related: ['pe-ratio-calculator', 'graham-number-calculator', 'dividend-yield-calculator'],
  },

  'nss-profit-calculator': {
    slug: 'nss-profit-calculator',
    category: 'savings-bonds',
    metaTitle: 'NSS Profit Calculator 2026 | National Savings after tax',
    metaDescription:
      'After-tax profit on Behbood, Regular Income, Special Savings, Defence and Short Term certificates, using the official CDNS rates effective 21 October 2026.',
    title: 'National Savings Profit Calculator',
    lede: 'National Savings is not one product. The payout schedule, the term and even the rate change with the certificate, and withholding takes 15% or 30% of every profit payment. This tool does the arithmetic for the certificate you are actually buying.',
    howTitle: 'Each certificate pays differently.',
    howBody:
      'Behbood, Pensioners and Shuhada pay profit monthly. Regular Income pays monthly over five years. Special Savings pays every six months, with a higher final payment. Defence compounds and pays once at maturity. Short Term pays at maturity at a rate set by the tenor.',
    sections: [
      {
        heading: 'The rate is administrative, not a market price',
        paragraphs: [
          'CDNS sets National Savings rates by notification, with an effective date. The schedule used here took effect on 21 October 2026. It does not move with Treasury bill yields or KIBOR every day, and it can change without a market event.',
          'That is why the page shows the effective date next to the rate. A rate copied from an old article can be months out of date, and the certificate you buy will use the schedule in force on the day of purchase.',
        ],
      },
      {
        heading: 'Withholding is taken from the profit, not the principal',
        paragraphs: [
          'A filer pays 15% and a non-filer pays 30% on the profit. The principal is returned in full at maturity, so the deduction reduces the return rather than the amount you get back. Zakat at 2.5% may also be deducted where it applies.',
          'The tool applies withholding to each payment and shows both the gross and net figures. A non-filer paying 30% keeps roughly seven tenths of the profit, which is a large difference on a five-year certificate.',
        ],
      },
      {
        heading: 'Where the arithmetic stops',
        paragraphs: [
          'The calculator assumes the certificate is held to maturity and the profit is paid out rather than reinvested. Early encashment usually pays a lower rate or a penalty, and the rules differ by certificate.',
          'Defence Savings use the official maturity factor of 3.15, so Rs 100,000 becomes Rs 315,000 after ten years. That is the table figure, not a compounded 11.94%, and the tool uses the table because it is the amount CDNS actually pays.',
        ],
      },
    ],
    sources: ['cdnsRates', 'whtCard'],
    sourceTitle: 'Rates and source',
    sourceIntro:
      'Official CDNS profit rates effective 21 October 2026, checked 13 November 2026. The same page states 15% filer and 30% non-filer withholding on National Savings profit, and 2.5% zakat where applicable.',
    sourceExtra:
      'CDNS changes these rates by notification, not on a market schedule. Check the official page before you invest. Early encashment, zakat and product-specific rules are outside the arithmetic.',
    related: ['bank-term-deposit-calculator', 't-bill-calculator', 'pib-bond-yield-calculator'],
  },

  't-bill-calculator': {
    slug: 't-bill-calculator',
    category: 'savings-bonds',
    metaTitle: 'T-Bill Calculator Pakistan | Price, yield and after-tax profit',
    metaDescription:
      'Calculate the discounted price, gain at maturity and after-tax return on Pakistan Treasury Bills using the latest SBP auction cut-off yields.',
    title: 'T-Bill Calculator',
    lede: 'A Treasury bill is bought below face value and repaid at face value. The gap is the return, and it is taxed as profit on debt. This tool reads the latest SBP auction cut-off and turns it into the cash you pay and the cash you keep.',
    howTitle: 'Discount pricing on a 365-day year.',
    howBody:
      'The price is 100 divided by one plus the cut-off yield times the day count over 365. The gain is face value minus the amount invested, and withholding applies to the gain rather than the face value.',
    sections: [
      {
        heading: 'Where the yield comes from',
        paragraphs: [
          'SBP publishes a market Treasury bills auction result as a PDF after each auction. The tool reads the cut-off yields for the 1, 3, 6 and 12 month tenors from that file and shows the auction date.',
          'If the file cannot be read, the tool falls back to a dated snapshot and labels it. The yield is editable either way, so you can model a secondary-market price or an older auction.',
        ],
      },
      {
        heading: 'The day count moves the price',
        paragraphs: [
          'The calculator uses 30, 91, 182 and 365 days for the four tenors. Actual settlement dates shift by a day or two, so SBP’s published price can differ from this one by a few paisa.',
          'The difference is small, but it is the reason the tool shows the day count it used rather than presenting the price as exact to the last decimal.',
        ],
      },
      {
        heading: 'Tax depends on who holds the bill',
        paragraphs: [
          'An individual pays 15% as a filer and 30% as a non-filer on profit from government securities. A company pays 20% or 40%. The rate comes from section 151 of the Income Tax Ordinance.',
          'The bill is a discount instrument, so the whole gain is profit on debt. Selling before maturity can create a capital gain or loss that is treated differently, and the secondary-market yield may not match the auction cut-off.',
        ],
      },
    ],
    sources: ['sbpTbills', 'whtCard'],
    sourceTitle: 'Yields and tax',
    sourceIntro:
      'Cut-off yields are read from the latest SBP Market Treasury Bills auction result and the auction date is shown on the page. Withholding follows section 151 of the Income Tax Ordinance.',
    sourceExtra:
      'The price uses a 365-day year and the day count shown. It ignores transaction costs, early sale, secondary-market pricing and any zakat deduction.',
    related: ['pib-bond-yield-calculator', 'nss-profit-calculator', 'bank-term-deposit-calculator'],
  },

  'pib-bond-yield-calculator': {
    slug: 'pib-bond-yield-calculator',
    category: 'savings-bonds',
    metaTitle: 'PIB Bond Yield Calculator | YTM, clean and dirty price',
    metaDescription:
      'Yield to maturity on coupon-paying Pakistan Investment Bonds from the clean price, with accrued interest, coupon income and withholding tax.',
    title: 'PIB and Bond Yield Calculator',
    lede: 'A bond is quoted at a clean price, but you pay the clean price plus the interest that has built up since the last coupon. This tool solves the yield from that dirty price, so the number matches the cash that leaves your account.',
    howTitle: 'Price is quoted. Yield is solved.',
    howBody:
      'There is no closed form once the first coupon period is partial, so the yield is found by bisection: the rate that makes the present value of the remaining coupons and the face value equal the dirty price.',
    sections: [
      {
        heading: 'Clean price, dirty price and accrued interest',
        paragraphs: [
          'The clean price excludes the interest earned since the last coupon. The seller is owed that interest, so the buyer pays the clean price plus accrued interest, which is the dirty price.',
          'The next coupon then comes to the buyer in full. That is why a bond bought between coupon dates costs more than its quoted price, and why the yield has to be solved from the dirty price rather than the clean one.',
        ],
      },
      {
        heading: 'Why the 2-year and 15-year PIBs are not here',
        paragraphs: [
          'SBP also auctions zero-coupon PIBs at 2 and 15 years. They pay no coupon, so their price and yield use a different convention from the coupon-paying 3, 5 and 10 year bonds.',
          'Mixing the two in one calculator would produce a number that looks comparable but is not. This tool prices coupon-paying bonds only, and the reference rows come from the fixed-rate auction result.',
        ],
      },
      {
        heading: 'The tax is on the coupons',
        paragraphs: [
          'Withholding applies to each coupon: 15% or 30% for an individual, 20% or 40% for a company, under section 151. The face value returned at maturity is not taxed again.',
          'If the bond is sold before maturity, the difference between the sale price and the purchase price is a capital gain or loss with its own treatment. The calculator assumes the bond is held to maturity.',
        ],
      },
    ],
    sources: ['sbpPibs', 'whtCard'],
    sourceTitle: 'Prices and tax',
    sourceIntro:
      'Reference prices, coupons and cut-off yields are read from the latest SBP fixed-rate PIB auction result and the auction date is shown on the page. Withholding follows section 151 of the Income Tax Ordinance.',
    sourceExtra:
      'The calculator assumes the bond is held to maturity with every coupon paid on time, uses a 365-day year, and ignores transaction costs, early sale, secondary-market pricing, zakat and any capital gain treatment. SBP computes its published cut-off yield with its own day-count convention, so a yield solved here from the same price can differ by a few basis points.',
    related: ['t-bill-calculator', 'nss-profit-calculator', 'bank-term-deposit-calculator'],
  },

  'bank-term-deposit-calculator': {
    slug: 'bank-term-deposit-calculator',
    category: 'savings-bonds',
    metaTitle: 'Bank Term Deposit Calculator Pakistan | After-tax profit',
    metaDescription:
      'Calculate profit after withholding tax on a bank term deposit or savings account, with monthly, quarterly or annual crediting and reinvested or paid-out profit.',
    title: 'Bank Term Deposit Calculator',
    lede: 'A bank deposit is the simplest savings product and the easiest to misread. The quoted rate is annual, the profit may be credited monthly or at maturity, and withholding takes 20% or 40% before the money reaches you.',
    howTitle: 'The rate is annual. The crediting is not.',
    howBody:
      'When profit is reinvested it compounds at the after-tax rate. When it is paid out the principal stays flat and the return is simple. Both are shown as an effective annual figure so they can be compared on the same basis.',
    sections: [
      {
        heading: 'Banks set their own rates',
        paragraphs: [
          'The SBP policy rate is a benchmark, not a deposit rate. It was 12.00% on 13 November 2026, and banks price deposits above or below it depending on their funding needs and the tenor.',
          'The rate field starts at the policy rate so the tool is not blank, but the figure that matters is the one on your bank’s rate sheet or your statement. Replace it before you rely on the result.',
        ],
      },
      {
        heading: 'Withholding here is higher than on National Savings',
        paragraphs: [
          'Profit on a bank account or deposit is taxed at 20% for a filer and 40% for a non-filer under section 151 clause (a). National Savings and other profit on debt are taxed at 15% and 30%.',
          'That difference is easy to miss when comparing a bank deposit with a certificate. A deposit paying the same gross rate as a certificate can return less after tax.',
        ],
      },
      {
        heading: 'What the effective rate tells you',
        paragraphs: [
          'Monthly crediting compounds within the tenor, so the effective annual return is higher than the quoted rate. Annual crediting does not, so the two are not the same even at the same headline rate.',
          'The tool shows both the effective rate and a simple annual figure. The simple figure is the one to compare with a certificate that pays profit out, because it ignores compounding.',
        ],
      },
    ],
    sources: ['sbpPolicy', 'whtCard'],
    sourceTitle: 'Benchmark and tax',
    sourceIntro:
      'The policy rate is 12.00% as on 13 November 2026 and is used only as a labelled starting point. Withholding on bank deposit profit is 20% for a filer and 40% for a non-filer under section 151 clause (a).',
    sourceExtra:
      'Banks set their own deposit rates and can change them. The calculator assumes the rate stays fixed for the full tenor and ignores early withdrawal penalties, minimum balances, zakat and bank-specific charges.',
    related: ['nss-profit-calculator', 't-bill-calculator', 'pib-bond-yield-calculator'],
  },
};
