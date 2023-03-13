export const questions: {
  question: string
  weight: { R: number; G: number; B: number }
}[] = [
  {
    question: '私は新しいことに挑戦することが好きだ。',
    weight: { R: 3, G: 2, B: 8 },
  },
  {
    question: '私は人々と交流することが容易である。',
    weight: { R: 5, G: 7, B: 2 },
  },
  {
    question: '私は決定を下すことが迅速である。',
    weight: { R: 8, G: 1, B: 1 },
  },
  {
    question: '私はストレスの多い状況でも冷静さを保つことができる。',
    weight: { R: 2, G: 8, B: 2 },
  },
  {
    question: '私は協力してプロジェクトを進めることが好きだ。',
    weight: { R: 1, G: 6, B: 7 },
  },
  {
    question: '私は物事を論理的に分析することが好きだ。',
    weight: { R: 6, G: 1, B: 7 },
  },
  {
    question: '私は自分自身に対して厳しい要求を課すことがある。',
    weight: { R: 7, G: 3, B: 1 },
  },
  {
    question: '私は創造的な解決策を見つけることが得意である。',
    weight: { R: 2, G: 9, B: 3 },
  },
  {
    question: '私は自分自身に対して自信を持っている。',
    weight: { R: 8, G: 6, B: 1 },
  },
  {
    question: '私は短期目標と長期目標の両方を持っている。',
    weight: { R: 4, G: 4, B: 4 },
  },
]
// const b =
//     [
//     {
//       question: '私は新しいことに挑戦することが好きだ。',
//       weight: { R: -10, G: 2, B: 5 },
//     },
//     {
//       question: '私は物事を深く考える方だ。',
//       weight: { R: -7, G: -5, B: 10 },
//     },
//     {
//       question: '私は人とのコミュニケーションが得意だ。',
//       weight: { R: 8, G: 4, B: -4 },
//     },
//     {
//       question: '私は理論よりも実践を重視する。',
//       weight: { R: 2, G: -6, B: 8 },
//     },
//     {
//       question: '私は自分の意見をはっきりと主張する方だ。',
//       weight: { R: 10, G: -5, B: 2 },
//     },
//     {
//       question: '私は人の役に立ちたいと思っている。',
//       weight: { R: 4, G: 8, B: -6 },
//     },
//     {
//       question: '私は計画的な行動が得意だ。',
//       weight: { R: -4, G: 10, B: -3 },
//     },
//     {
//       question: '私はストレスを感じやすい方だ。',
//       weight: { R: -8, G: -6, B: 5 },
//     },
//     {
//       question: '私は変化や新しいことに対して、どちらかというと抵抗がある。',
//       weight: { R: -5, G: -2, B: -10 },
//     },
//     {
//       question: '私は物事をコントロールすることが好きだ。',
//       weight: { R: 6, G: -3, B: 8 },
//     },
//   ]

// 最大で薄い緑、水色になったり、薄いピンクになったり
// const a = [
//   {
//     question: '私は新しいことに挑戦することが好きだ。',
//     weight: { R: 4, G: 2, B: 0 },
//   },
//   {
//     question: '私は人との交流が好きで、社交的な方だと思う。',
//     weight: { R: 2, G: 4, B: 1 },
//   },
//   {
//     question: '私は自分自身を律することができ、自制心がある。',
//     weight: { R: 1, G: 3, B: 3 },
//   },
//   {
//     question: '私はチャレンジ精神に富み、諦めずに最後までやり抜く。',
//     weight: { R: 5, G: 1, B: 1 },
//   },
//   {
//     question:
//       '私は自分の意見をしっかりと持っており、それに基づいて行動する。',
//     weight: { R: 2, G: 3, B: 2 },
//   },
//   {
//     question: '私は常に自己成長を目指し、自分を高めることに努めている。',
//     weight: { R: 0, G: 4, B: 3 },
//   },
//   {
//     question: '私は人の気持ちを理解し、配慮することができる。',
//     weight: { R: 1, G: 4, B: 2 },
//   },
//   {
//     question: '私は創造性に富み、新しいアイデアを出すことが得意だ。',
//     weight: { R: 4, G: 2, B: 1 },
//   },
//   {
//     question: '私は計画的で、物事を着実に進めることができる。',
//     weight: { R: 1, G: 3, B: 3 },
//   },
//   {
//     question: '私は自分の仕事に責任を持ち、真面目に取り組む。',
//     weight: { R: 2, G: 3, B: 2 },
//   },
// ]

// いい色にならない
//   [
//   {
//     question: '私は新しいことに挑戦することが好きだ。',
//     weight: { R: 5, G: 2, B: 1 },
//   },
//   {
//     question: '私は人々と交流することが容易である。',
//     weight: { R: 3, G: 5, B: 2 },
//   },
//   {
//     question: '私は決定を下すことが迅速である。',
//     weight: { R: 2, G: 1, B: 5 },
//   },
//   {
//     question: '私はストレスの多い状況でも冷静さを保つことができる。',
//     weight: { R: 4, G: 2, B: 4 },
//   },
//   {
//     question: '私は協力してプロジェクトを進めることが好きだ。',
//     weight: { R: 3, G: 4, B: 2 },
//   },
//   {
//     question: '私は物事を論理的に分析することが好きだ。',
//     weight: { R: 2, G: 5, B: 3 },
//   },
//   {
//     question: '私は自分自身に対して厳しい要求を課すことがある。',
//     weight: { R: 4, G: 1, B: 4 },
//   },
//   {
//     question: '私は創造的な解決策を見つけることが得意である。',
//     weight: { R: 3, G: 4, B: 3 },
//   },
//   {
//     question: '私は自分自身に対して自信を持っている。',
//     weight: { R: 2, G: 2, B: 5 },
//   },
//   {
//     question: '私は短期目標と長期目標の両方を持っている。',
//     weight: { R: 10, G: 3, B: 2 },
//   },
// ]
