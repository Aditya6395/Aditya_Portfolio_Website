# 🚀 How to Start the Server

## Problem Fixed: CORS Error

The CORS error has been fixed by creating a backend API server. Now you need to run both the backend server and React app.

## Option 1: Run Both Together (Recommended)

Run this command to start both backend and frontend:

```bash
npm run dev
```

This will start:
- ✅ Backend API server on `http://localhost:5000`
- ✅ React app on `http://localhost:3000`

## Option 2: Run Separately

### Terminal 1 - Start Backend Server:
```bash
npm run server
```

### Terminal 2 - Start React App:
```bash
npm start
```

## ✅ Verify Setup

1. Backend server should show:
   ```
   🚀 Email API server running on http://localhost:5000
   📧 Ready to send emails to: aadityachauhan6395@gmail.com
   ```

2. React app should open on `http://localhost:3000`

3. Test the contact form - it should work without CORS errors!

## 🔧 Troubleshooting

**Port 5000 already in use?**
- Change PORT in server.js or set environment variable:
  ```bash
  PORT=5001 npm run server
  ```

**API key not found?**
- Make sure `.env.local` file exists with:
  ```
  REACT_APP_RESEND_API_KEY=re_VjKbYvxQ_3wiHLdDArwBT7DD2tj4jipNa
  REACT_APP_CONTACT_EMAIL=aadityachauhan6395@gmail.com
  REACT_APP_FROM_EMAIL=onboarding@resend.dev
  ```

**Still getting CORS error?**
- Make sure backend server is running on port 5000
- Check browser console for the actual error message
- Verify the API URL in emailService.js

## 📧 Testing

1. Fill out the contact form
2. Submit it
3. Check your email: **aadityachauhan6395@gmail.com**
4. You should receive a beautifully formatted email! 🎉

---

**That's it! Your contact form should now work perfectly!** ✨

