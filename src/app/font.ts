import { Raleway, Poppins, Noto_Sans_Telugu } from 'next/font/google'
import localFont from 'next/font/local'

export const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'], display: 'swap' })
export const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'], display: 'swap' })
export const notoSansTelugu = Noto_Sans_Telugu({ subsets: ['telugu'], weight: ['300', '400', '500', '600', '700'], display: 'swap' })

export const nordeco = localFont({
  src: [
    {
      path: '../../public/assets/fonts/nordeco-font/NordecoCyrillic-Bold/NordecoCyrillic-Bold.ttf',
      style: 'normal',
      weight: '700',
    },
    {
      path: '../../public/assets/fonts/nordeco-font/NordecoCyrillic-Regular/NordecoCyrillic-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
  ],

  variable: '--font-nordeco',
})

export const betm = localFont({
  src: [
    {
      path: '../../public/assets/fonts/betm/BetmLight.otf',
      style: 'light',
      weight: '300',
    },
    {
      path: '../../public/assets/fonts/betm/BetmSemiLight.otf',
      style: 'semilight',
      weight: '400',
    },
    {
      path: '../../public/assets/fonts/betm/BetmMedium.otf',
      style: 'medium',
      weight: '500',
    },
    {
      path: '../../public/assets/fonts/betm/BetmSemiBold.otf',
      style: 'semibold',
      weight: '600',
    },
    {
      path: '../../public/assets/fonts/betm/BetmBold.otf',
      style: 'normal',
      weight: '700',
    },
  ],
})

export const betmRound = localFont({
  src: [
    {
      path: '../../public/assets/fonts/betm-round/BetmRounded-Thin.ttf',
      style: 'thin',
      weight: '100',
    },
    {
      path: '../../public/assets/fonts/betm-round/BetmRounded-ExtraLight.ttf',
      style: 'extralight',
      weight: '200',
    },
    {
      path: '../../public/assets/fonts/betm-round/BetmRounded-Light.ttf',
      style: 'light',
      weight: '300',
    },

    {
      path: '../../public/assets/fonts/betm-round/BetmRounded-Regular.ttf',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/assets/fonts/betm-round/BetmRounded-Medium.ttf',
      style: 'medium',
      weight: '500',
    },
    {
      path: '../../public/assets/fonts/betm-round/BetmRounded-SemiBold.ttf',
      style: 'semibold',
      weight: '600',
    },
    {
      path: '../../public/assets/fonts/betm-round/BetmRounded-Bold.ttf',
      style: 'bold',
      weight: '700',
    },
  ],

  variable: '--font-betm-round',
})
