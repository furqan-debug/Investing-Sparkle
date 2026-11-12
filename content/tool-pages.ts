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
};
