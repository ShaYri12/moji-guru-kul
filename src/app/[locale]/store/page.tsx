import CustomHeader from '@/components/common/CustomHeader'
import StudentShop from '@/components/Main/StudentShop'
import Shop from '@/components/Shop'
import { fetchRequest } from '@/network/FetchRequest'
import { useTranslations } from 'next-intl'
import { cookies } from 'next/headers'

export default  function ShopPage() {
  // const t = useTranslations('Store')
  return (
    <div >
      {/* <Shop data={data} /> */}
        <CustomHeader
        title={'Student Store'}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Store', href: '/shop' },
        ]}
      />
      <div className="py-12">
        <StudentShop />
      </div>
    </div>
  )
}
