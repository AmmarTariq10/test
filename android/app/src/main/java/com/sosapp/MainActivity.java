package com.sosapp;
import android.view.Gravity;
import android.util.TypedValue;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;


import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
@Override
    public int getSplashLayout() {
        return R.layout.launch_screen;
    }
}