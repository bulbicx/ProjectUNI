import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { BuyProperties } from './buyProperties'
import { Favourites } from './favourites'
import { Contracts } from './contracts'
import { Reviews } from './reviews'
import { Auth } from './auth'
import { Registration } from './registration'
import { Alert } from './alert'
import { Users } from './users'
import { User } from './user'
import { RentProperties } from './rentProperties'
import { Properties } from './properties'
import { Sales } from './sales'
import { Fees } from './fees'
import { TodaySales } from './sales/todaySales'
import { Minus7Sales } from './sales/minus7Sales'
import { Minus14Sales } from './sales/minus14Sales'
import { Minus21Sales } from './sales/minus21Sales'
import { Minus28Sales } from './sales/minus28Sales'
import { Minus35Sales } from './sales/minus35Sales'
import { ContractsLastMonth } from './lastMonthReport/contractsLastMonth'
import { ProfitLastMonth } from './lastMonthReport/profitLastMonth'
import { ProfitThisYear } from './lastMonthReport/profitThisYear'
import { NewUsersLastMonth } from './lastMonthReport/newUsersLastMonth'
import { ProfitReport } from './customReport/profitReport'
import { Landlords } from './landlords'
import { UsersReport } from './customReport/usersReport'
import { PropertiesReport } from './customReport/propertiesReport'
import { ContractReport } from './customReport/contractsReports'
import { Offers } from './offers'
import { Viewings } from './viewings'
import { Notifications } from './notifications'
import { Appointments } from './appointments'
import { AllProperties } from './allProperties'

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            buyProperties: BuyProperties,
            rentProperties: RentProperties,
            properties: Properties,
            favourites: Favourites,
            contracts: Contracts,
            reviews: Reviews,
            auth: Auth,
            registration: Registration,
            alert: Alert,
            users: Users,
            user: User,
            sales: Sales,
            fees: Fees,
            todaySales: TodaySales,
            minus7Sales: Minus7Sales,
            minus14Sales: Minus14Sales,
            minus21Sales: Minus21Sales,
            minus28Sales: Minus28Sales,
            minus35Sales: Minus35Sales,
            contractsLastMonth: ContractsLastMonth,
            profitLastMonth: ProfitLastMonth,
            profitThisYear: ProfitThisYear,
            newUsersLastMonth: NewUsersLastMonth,
            profitReport: ProfitReport,
            landlords: Landlords,
            usersReport: UsersReport,
            propertiesReport: PropertiesReport,
            contractReport: ContractReport,
            offers: Offers,
            viewings: Viewings,
            notifications: Notifications,
            appointments: Appointments,
            allProperties: AllProperties
        }),
        applyMiddleware(thunk, logger)//enhancers applied
    )

    return store
}