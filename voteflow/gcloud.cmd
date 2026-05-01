@echo off
set CLOUDSDK_ROOT_DIR=C:\Users\Admin\AppData\Local\Google\Cloud SDK\google-cloud-sdk
set CLOUDSDK_PYTHON=%CLOUDSDK_ROOT_DIR%\platform\bundledpython\python.exe
"%CLOUDSDK_PYTHON%" "%CLOUDSDK_ROOT_DIR%\lib\gcloud.py" %*
