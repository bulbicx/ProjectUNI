import React, { Component } from 'react'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
//import './App.css'
import Footer from './Components/Footer'
import Sell from './Components/Sell/Sell'
import Let from './Components/Let/Let'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import AboutUs from './Components/AboutUs/AboutUs'
import SignUp from './Components/SignUp/SignUp'
import Login from './Components/Login/Login'
import PropertiesToBuy from './Components/PropertiesToBuy/PropertiesToBuy'
import PropertiesToRent from './Components/PropertiesToRent/PropertiesToRent'
import PropertyDetail from './Components/PropertyDetail/PropertyDetail'
import DashboardUser from './Components/MyProfile/DashboardUser'
import Dashboard from './Components/Admin/Dashboard'
import { connect } from 'react-redux'
import { fetchProperties, postFavourite, fetchContracts, postReview, loginUser, logoutUser, signupUser, clear, fetchUsers, fetchUser, fetchFavourites, deleteFavourite, fetchRentProperties, fetchBuyProperties, fetchReviews, fetchFees, fetchSales, fetchTodaySales, fetchMinus7Sales, fetchMinus14Sales, fetchMinus21Sales, fetchMinus28Sales, fetchMinus35Sales, fetchContractsLastMonth, fetchProfitLastMonth, fetchProfitThisYear, fetchNewUsersLastMonth, getCustomProfitReport, deleteProperty, createProperty, createLandlord, fetchLandlords, deleteLandlord, getPropertyDetails, createUser, deleteUser, getUserDetails, updateUser, getLandlordDetails, updateLandlord, createSale, getSaleDetails, deleteSale, updateSale, createContract, getContractDetails, deleteContract, updateContract, searchBuyProperty, searchRentProperty, customProfitClear, getReviewDetails, updateReview, deleteReview, getCustomUsersReport, customUsersReportClear, getCustomPropertiesReport, customPropertiesReportClear, getCustomContractsReport, customContractsReportClear, makeNewOffer, fetchOffers, fetchViewings, fetchNotifications, fetchAppointments, fetchAllProperties } from './redux/ActionCreators'
import Loader from './Components/Viewing/loader'
import { history } from './redux/helpers/history'
import { PrivateRoute } from './Components/PrivateRoute'
import ReviewDetail from './Components/reviews/ReviewDetail'
import Reviews from './Components/reviews/Reviews'
import Unauthorized from './Components/Admin/Unauthorized'
import PrivacyNotice from './Components/SignUp/privacyNotice'
import TermConditions from './Components/SignUp/termConditions'
import CookiePolicy from './Components/Home/CookiePolicy'
import Reset from './Components/Login/Reset'
import Forgot from './Components/Login/Forgot'

const mapStateToProps = state => {
  const { registering } = state.registration
    return {
      properties: state.properties,
      rentProperties: state.rentProperties,
      buyProperties: state.buyProperties,
      favourites: state.favourites,
      contracts: state.contracts,
      reviews: state.reviews,
      auth: state.auth,
      registering: registering,
      alert: state.alert,
      users: state.users,
      user: state.user,
      sales: state.sales,
      fees: state.fees,
      todaySales: state.todaySales,
      minus7Sales: state.minus7Sales,
      minus14Sales: state.minus14Sales,
      minus21Sales: state.minus21Sales,
      minus28Sales: state.minus28Sales,
      minus35Sales: state.minus35Sales,
      contractsLastMonth: state.contractsLastMonth,
      profitLastMonth: state.profitLastMonth,
      profitThisYear: state.profitThisYear,
      newUsersLastMonth: state.newUsersLastMonth,
      profitReport: state.profitReport,
      usersReport: state.usersReport,
      propertiesReport: state.propertiesReport,
      contractsReports: state.contractsReports,
      landlords: state.landlords,
      offers: state.offers,
      viewings: state.viewings,
      notifications: state.notifications,
      appointments: state.appointments,
      allProperties: state.allProperties
    }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProperties: () => {dispatch(fetchProperties())},
  propertyDelete: (id) => {dispatch(deleteProperty(id))},
  getPropertyDetails: (id) => {dispatch(getPropertyDetails(id))},
  propertyCreate: (property) => {dispatch(createProperty(property))},
  fetchRentProperties: () => {dispatch(fetchRentProperties())},
  searchRentProperty: (propertyName, pricePcm, school, train, bedNum, crime, pet, pageNo, limit) => {dispatch(searchRentProperty(propertyName, pricePcm, school, train, bedNum, crime, pet, pageNo, limit))},
  fetchBuyProperties: () => {dispatch(fetchBuyProperties())},
  searchBuyProperty: (propertyName, salePrice, school, train, bedNum, crime, pageNo, limit) => {dispatch(searchBuyProperty(propertyName, salePrice, school, train, bedNum, crime, pageNo, limit))},
  fetchReviews: () => {dispatch(fetchReviews())},
  fetchContracts: () => {dispatch(fetchContracts())},
  createContract: (contract) => {dispatch(createContract(contract))},
  updateContract: (contract) => {dispatch(updateContract(contract))},
  getContractDetails: (id) => {dispatch(getContractDetails(id))},
  deleteContract: (id) => {dispatch(deleteContract(id))},
  fetchFavourites: () => {dispatch(fetchFavourites())},
  postFavourite: (propertyId) => dispatch(postFavourite(propertyId)),
  deleteFavourite: (propertyId) => dispatch(deleteFavourite(propertyId)),
  postReview: (landlordRating, propertyRating, title, reviewBody, propertyId) => dispatch(postReview(landlordRating, propertyRating, title, reviewBody, propertyId)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (data) => dispatch(signupUser(data)),
  clear: () => dispatch(clear()),
  deleteUser: (userId) => {dispatch(deleteUser(userId))},
  fetchUsers: () => {dispatch(fetchUsers())},
  fetchUser: () => {dispatch(fetchUser())},
  createUser: (user) => {dispatch(createUser(user))},
  fetchSales: () => {dispatch(fetchSales())},
  createSale: (sale) => {dispatch(createSale(sale))},
  updateSale: (sale) => {dispatch(updateSale(sale))},
  fetchFees: () => {dispatch(fetchFees())},
  getSaleDetails: (id) => {dispatch(getSaleDetails(id))},
  deleteSale: (id) => {dispatch(deleteSale(id))},
  fetchTodaySales: () => {dispatch(fetchTodaySales())},
  fetchMinus7Sales: () => {dispatch(fetchMinus7Sales())},
  fetchMinus14Sales: () => {dispatch(fetchMinus14Sales())},
  fetchMinus21Sales: () => {dispatch(fetchMinus21Sales())},
  fetchMinus28Sales: () => {dispatch(fetchMinus28Sales())},
  fetchMinus35Sales: () => {dispatch(fetchMinus35Sales())},
  fetchContractsLastMonth: () => {dispatch(fetchContractsLastMonth())},
  fetchProfitLastMonth: () => {dispatch(fetchProfitLastMonth())},
  fetchProfitThisYear: () => {dispatch(fetchProfitThisYear())},
  fetchNewUsersLastMonth: () => {dispatch(fetchNewUsersLastMonth())},
  getCustomProfitReport: (startDate, endDate) => {dispatch(getCustomProfitReport(startDate, endDate))},
  customProfitClear: () => {dispatch(customProfitClear())},
  fetchLandlords: () => {dispatch(fetchLandlords())},
  createLandlord: (landlord) => {dispatch(createLandlord(landlord))},
  getLandlordDetails: (id) => {dispatch(getLandlordDetails(id))},
  updateLandlord: (landlord) => {dispatch(updateLandlord(landlord))},
  deleteLandlord: (id) => {dispatch(deleteLandlord(id))},
  getUserDetails: (id) => {dispatch(getUserDetails(id))},
  updateUser: (user) => {dispatch(updateUser(user))},
  getReviewDetails: (id) => {dispatch(getReviewDetails(id))},
  updateReview: (review) => {dispatch(updateReview(review))},
  deleteReview: (id) => {dispatch(deleteReview(id))},
  getCustomUsersReport: (start, end) => {dispatch(getCustomUsersReport(start, end))},
  customUsersReportClear: () => {dispatch(customUsersReportClear())},
  getCustomPropertiesReport: (start, end) => {dispatch(getCustomPropertiesReport(start, end))},
  customPropertiesReportClear: () => {dispatch(customPropertiesReportClear())},
  getCustomContractsReport: (start, end) => {dispatch(getCustomContractsReport(start, end))},
  customContractsReportClear: () => { dispatch(customContractsReportClear()) },
  makeNewOffer: (offer) => { dispatch(makeNewOffer(offer)) },
  fetchOffers: () => { dispatch(fetchOffers()) },
  fetchViewings: () => { dispatch(fetchViewings()) },
  fetchNotifications: () => { dispatch(fetchNotifications()) },
  fetchAppointments: () => { dispatch(fetchAppointments()) },
  fetchAllProperties: () => { dispatch(fetchAllProperties())}
})

class App extends Component {

  constructor(props) {
    super(props)

    history.listen((location, action) => {
      //clear alert on location change
      this.props.clear() 
      this.props.fetchNotifications()
    })

  }

  componentDidMount() {
    this.props.fetchProperties()
    this.props.fetchRentProperties()
    this.props.fetchBuyProperties()
    this.props.fetchContracts()
    this.props.fetchUsers()
    this.props.fetchUser()
    this.props.fetchFavourites()
    this.props.fetchReviews()
    this.props.fetchSales()
    this.props.fetchFees()
    this.props.fetchTodaySales()
    this.props.fetchMinus7Sales()
    this.props.fetchMinus14Sales()
    this.props.fetchMinus21Sales()
    this.props.fetchMinus28Sales()
    this.props.fetchMinus35Sales()
    this.props.fetchContractsLastMonth()
    this.props.fetchProfitLastMonth()
    this.props.fetchProfitThisYear()
    this.props.fetchNewUsersLastMonth()
    this.props.fetchLandlords()
    this.props.fetchOffers()
    this.props.fetchViewings()
    this.props.fetchNotifications()
    this.props.fetchAppointments()
    this.props.fetchAllProperties()
  }

  render() {
    return (
     <div className="App">
       <Header 
          auth={this.props.auth}
          logoutUser={this.props.logoutUser}
        />
         <Switch>
           <Route exact path="/">
             {this.props.auth.isAuthenticated ?
             <Home 
             properties={this.props.properties.properties.filter(property => property.featured) }
               propertiesLoading={this.props.properties.isLoading} 
               propertiesErrMess={this.props.properties.errMess} 
              />
             :
             <Home 
                properties={this.props.properties.properties.filter(property => property.featured) }
                propertiesLoading={this.props.properties.isLoading} 
                propertiesErrMess={this.props.properties.errMess} 
              />
             }
           </Route>
           <Route path="/sell">
             <Sell />
           </Route>
           <Route path="/let">
             <Let />
           </Route>
           <Route path="/about-us">
             <AboutUs />
           </Route>
           <Route exact path="/users/signup">
             { !this.props.auth.isAuthenticated
              ?
              <SignUp 
                  signupUser={this.props.signupUser}
                  registering={this.props.registering} 
                  alert={this.props.alert}
                />
              :
              <Redirect to="/" />
            } 
          </Route>
          <Route exact path="/privacy-policy">
            <PrivacyNotice />
          </Route>
          <Route exact path="/term-and-conditions">
            <TermConditions />
          </Route>
          <Route exact path="/cookie-policy">
            <CookiePolicy />
          </Route>
           <Route path="/users/login">
             { !this.props.auth.isAuthenticated 
              ?
              <Login 
                 auth={this.props.auth}
                 loginUser={this.props.loginUser}
                 alert={this.props.alert}
                />
              :
              <Redirect to="/" />
            }
          </Route>
          <Route exact path="/auth/password/forgot" component={Forgot} />
          <Route exact path="/auth/password/reset/:token" component={Reset} />
           <Route exact path="/properties-to-buy">
             {this.props.auth.isAuthenticated && this.props.favourites.favourites
             ?
             <PropertiesToBuy 
                properties={this.props.buyProperties}
                postFavourite={this.props.postFavourite}
                deleteFavourite={this.props.deleteFavourite}
                favourites={this.props.favourites.favourites}
              />
             :
             <PropertiesToBuy 
                properties={this.props.buyProperties}
                postFavourite={this.props.postFavourite}
                deleteFavourite={this.props.deleteFavourite}
                favourites={false}
              />
            } 
             {/* <PropertiesWithId /> */}
           </Route>
           <Route path="/properties-to-buy/:propertyId">
             <PropertyDetail 
                properties={this.props.buyProperties.properties}
                isLoading={this.props.buyProperties.isLoading} 
                errMess={this.props.buyProperties.errMess} 
             />
           </Route>
           <Route exact path="/properties-to-rent">
             {this.props.auth.isAuthenticated && this.props.favourites.favourites
             ?
             <PropertiesToRent 
                properties={this.props.rentProperties}
                postFavourite={this.props.postFavourite}
                deleteFavourite={this.props.deleteFavourite}
                favourites={this.props.favourites.favourites}
              />
             :
              <PropertiesToRent 
                properties={this.props.rentProperties}
                postFavourite={this.props.postFavourite}
                deleteFavourite={this.props.deleteFavourite}
                favourites={false}
              /> 
              } 
           </Route>
           <Route exact path="/properties-to-rent/:propertyId">
             <PropertyDetail 
                properties={this.props.rentProperties.properties} 
                isLoading={this.props.rentProperties.isLoading} 
                errMess={this.props.rentProperties.errMess}
              reviews={this.props.reviews}
               />
          </Route>
           <PrivateRoute path="/users/account" component={() => 
                <DashboardUser 
                  favourites={this.props.favourites}
                  deleteFavourite={this.props.deleteFavourite}
                  favLoadErr={this.props.favourites}
                  contracts={this.props.contracts}
                  allProperties={this.props.properties.properties.filter(property => this.props.contracts.contracts != null && this.props.contracts.contracts.filter(el => el.property._id === property._id))}
                  postReview={this.props.postReview}
                  user={this.props.user.user}
                  userIsLoading={this.props.user.isLoading}
                  userErrMess={this.props.user.errMess}
                  auth={this.props.auth}
                  logoutUser={this.props.logoutUser}
                  alert={this.props.alert}
                  reviews={this.props.reviews.reviews.filter(review => review.author.username === this.props.auth.user.username)}
                  deleteReview={this.props.deleteReview}
                />
              } 
          />
          <Route path="/admin/dashboard" >
            {
              localStorage.getItem('admin') === 'true' ?
                
              <Dashboard 
                users={this.props.users}
                properties={this.props.properties}
                propertyDelete={this.props.propertyDelete}
                getPropertyDetails={this.props.getPropertyDetails}
                propertyCreate={this.props.propertyCreate}
                // sales={this.props.sales.sales}
                sales={this.props.sales}
                createSale={this.props.createSale}
                deleteSale={this.props.deleteSale}
                fees={this.props.fees.fees}
                contracts={this.props.contracts}
                deleteContract={this.props.deleteContract}
                todaySales={this.props.todaySales}
                minus7Sales={this.props.minus7Sales}
                minus14Sales={this.props.minus14Sales}
                minus21Sales={this.props.minus21Sales}
                minus28Sales={this.props.minus28Sales}
                minus35Sales={this.props.minus35Sales}
                contractsLastMonth={this.props.contractsLastMonth.contractsLastMonth.length > 0 ? this.props.contractsLastMonth.contractsLastMonth : false}
                profitLastMonth={this.props.profitLastMonth.profit.length > 0 ? this.props.profitLastMonth.profit : false}
                profitThisYear={this.props.profitThisYear.profit.length > 0 ? this.props.profitThisYear.profit : false}
                newUsersLastMonth={this.props.newUsersLastMonth.users.length > 0 ? this.props.newUsersLastMonth.users : false}
                getCustomProfitReport={this.props.getCustomProfitReport}
                customProfitClear={this.props.customProfitClear}
                customProfitReport={this.props.profitReport}
                getCustomUsersReport={this.props.getCustomUsersReport}
                customUsersReportClear={this.props.customUsersReportClear}
                getCustomPropertiesReport={this.props.getCustomPropertiesReport}
                customPropertiesReportClear={this.props.customPropertiesReportClear}
                customContractsReportClear={this.props.customContractsReportClear}
                getCustomContractsReport={this.props.getCustomContractsReport}
                alert={this.props.alert}
                createLandlord={this.props.createLandlord}
                landlords={this.props.landlords}
                deleteLandlord={this.props.deleteLandlord}
                createUser={this.props.createUser}
                deleteUser={this.props.deleteUser}
                getUserDetails={this.props.getUserDetails}
                />
                :
                <Unauthorized />
            }
            </Route>    
          
              
          
            <Route exact path="/reviews/:reviewId" component={ReviewDetail} />
            <Route exact path="/properties-to-rent/:propertyId/reviews" component={Reviews} />
           <PrivateRoute exact path="/load" component={() => <Loader auth={this.props.auth} />} />
         </Switch>
 
       <Footer />
     </div>
   );

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
