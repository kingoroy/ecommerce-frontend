import React, { useEffect, useRef, useState } from 'react';
import Modal from '../small-components/Modal-global';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import otpAsyncThunk from '../api/asyncThunk/otpAsyncThunk';
import { toast } from 'react-toastify';
import LoadingScreen from '../small-components/Loading-screen';
const OtpVerificationModal = (props) => {
    const {
      clickForgotPassword,
      setClickForgotPassword,
      clickVerifyEmail,
      setClickVerifyEmail,
      validateOtpEmailChange,
      validateOtpForgotPassword,
      setValidateOtpEmailChange,
      setValidateOtpForgotPassword,
    } = props;

    console.log('otp modal');

    const onClose =()=>{
        clickForgotPassword ? setClickForgotPassword(false) : setClickVerifyEmail(false);
        clickVerifyEmail ? setClickVerifyEmail(false) : setClickForgotPassword(false);
    }

    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(Array(4).fill(''));
  const loggedInEmail = useSelector(state=>state.user.loggedInEmail);
  const [searchParams]=useSearchParams();
  const otpData = useSelector(state=>state.otp);

  const {isSending, emailForOtp, otpSend} = otpData;

  const email=searchParams.get('email') || loggedInEmail;
  const dispatch = useDispatch();
  const {generateOtp, validateOtp} = otpAsyncThunk;

  const navigate=useNavigate();
  useEffect(()=>{
    if (!otpSend && !isSending && email) {
      let dataForDispatch = {
        input: email
      }
      dispatch(generateOtp(dataForDispatch)).
      unwrap()
      .then(()=>{
        toast.success('otp send successfully');
      }).catch(()=>{
        toast.error('an error occured during otp send');
      })
    }
  },[]);

  useEffect(() => {
    const fullOtp = getFullOtp();
    if(fullOtp.length === 4){
      let dataForDispatch = {
        email: loggedInEmail || email,
        otp: fullOtp,
      };
      dispatch(validateOtp(dataForDispatch)).unwrap()
        .then((res)=>{
          console.log(res);
          if (res === 'OTP successfully validated & User is already registered.') {
            
          }
          else if (res === 'OTP successfully validated but User is not registered.') {
          }
        }).catch((error)=>{
          console.log(error);
          if (error?.response?.status === 400) {
            toast.error('incorrect otp')
          } else if (error?.response?.status === 500) {
            toast.error('internal server error, try again.')
          } else {
            toast.error('something went wrong, do try again.')
          }
        })
    }
  }, [otp]); 

  const handleInputChange = (index, e) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Limit the value to the first character

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (index, e) => {
    const value = e.target.value;
    if (e.key === 'Backspace' && index > 0 && value.length === 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const getFullOtp = () => {
    return otp.join(''); // Combine the OTP array into a string
  };
  // console.log(loggedInEmail);

  const sendOtpAgain = () => {
    let dataForDispatch = {
      input: email
    }
    dispatch(generateOtp(dataForDispatch)).
    unwrap()
    .then(()=>{
      toast.success('otp send successfully');
    }).catch(()=>{
      toast.error('an error occured during otp send');
    })
  }
  return (
    <Modal 
    width="500px"
    // title="Otp Verification"
    onClose={onClose}
    height="400px"
    >
        <div style={{display:'flex',alignItems:'center',justifyContent:'center', marginTop:'30px'}}>
        {/* <OtpForEmailChange  
        clickForgotPassword ={clickForgotPassword}
        setClickForgotPassword={setClickForgotPassword}
        clickVerifyEmail={clickVerifyEmail}
        setClickVerifyEmail={setClickVerifyEmail}
        /> */}
         <div className='otp-main-container'>
      {isSending && <LoadingScreen/>}
      <h2>verify with OTP</h2>
      <p>sent to {email ? email : loggedInEmail}</p>
      <div className='otp-input-wrapper'>
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          ref={ref}
          type='number'
          autoFocus={index === 0}
          onChange={(e) => handleInputChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          value={otp && otp[index]}
          className='otp-input'
        />
      ))}
      </div>
      <p className='resend-otp-text' onClick={ sendOtpAgain }>resend OTP</p>
      <p className="loginText">login with <span className="password">password</span></p>
    </div>
        </div>
    </Modal>
  )
}

export default OtpVerificationModal