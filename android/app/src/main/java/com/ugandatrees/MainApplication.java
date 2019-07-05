package com.ugandatrees;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import cl.json.RNSharePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new RNSharePackage(),
            new FastImageViewPackage(),
            new ImageResizerPackage(),
            new NetInfoPackage(),
            new RNFetchBlobPackage(),
            new ReanimatedPackage(),
            new MapsPackage(),
            new RNScreensPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
