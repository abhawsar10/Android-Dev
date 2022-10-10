package com.myhw9app;

import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.StringDef;
import androidx.fragment.app.Fragment;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.myhw9app.MainActivity;
import com.squareup.picasso.Picasso;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class Fragment_Home extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        View v = inflater.inflate(R.layout.fragment_home,container,false);

        volleyGet("pop_movies", v);




        return v;

    }

    public void volleyGet(String endpoint, View v){

        String url = getString(R.string.api_url) + endpoint;

        RequestQueue requestQueue = Volley.newRequestQueue(this.getActivity());

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {
                try {
                    JSONArray jsonArray = response.getJSONArray(endpoint);

                    Method method = Fragment_Home.class.getDeclaredMethod("set_"+endpoint, View.class, JSONArray.class);
                    Fragment_Home obj = new Fragment_Home();
                    method.invoke(obj,v, jsonArray);

                    Log.d("data1",jsonArray.toString());

                } catch (JSONException | NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });

        requestQueue.add(jsonObjectRequest);
    }

    public void set_now_playing(View v, JSONArray jsonArray) throws JSONException {


        ImageView iv = (ImageView) v.findViewById(R.id.image1);
        Picasso.get().setLoggingEnabled(true);

        Picasso.get().load(jsonArray.getJSONObject(0).getString("backdrop_path")).into(iv);


        Log.d("datalodu",jsonArray.toString());

    }

    public void set_top_movies(View v, JSONArray jsonArray) throws JSONException {


        ImageView iv = (ImageView) v.findViewById(R.id.image1);
        Picasso.get().setLoggingEnabled(true);

        Picasso.get().load(jsonArray.getJSONObject(0).getString("poster_path")).into(iv);


        Log.d("datalodu",jsonArray.toString());

    }

    public void set_pop_movies(View v, JSONArray jsonArray) throws JSONException {


        ImageView iv = (ImageView) v.findViewById(R.id.image1);
        Picasso.get().setLoggingEnabled(true);

        Picasso.get().load(jsonArray.getJSONObject(0).getString("poster_path")).into(iv);


        Log.d("datalodu",jsonArray.toString());

    }

}



