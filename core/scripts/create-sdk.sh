echo "...[REMOVING-OLD-SDK-VERSION]"

if [ -d "../sdk" ]; then
    echo "...[REMOVING-OLD-SDK-VERSION]"
    rm -rf ../sdk
    echo "...[REMOVED-OLD-SDK-VERSION]"
else
    echo "...[NO-EXISTING-SDK-TO-REMOVE]"
fi

echo "...[REMOVED-OLD-SDK-VERSION]"



echo "...[CREATING-DIRECTORY-FOR-SDK]"
echo " "

mkdir ../sdk

cd ../sdk 

mkdir auth account vendor communication marketplace

echo "...[GENERATE-SDKS-PROCESSING]"
echo " "

echo "...[GENERATE-AUTH-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/auth-service-json -g typescript-axios -o ../sdk/auth 

echo " "
echo "...[GENERATE-AUTH-SDK-SUCCESS]"
echo " "

echo "...[GENERATE-ACCOUNT-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/account-service-json -g typescript-axios -o ../sdk/account 

echo " "
echo "...[GENERATE-ACCOUNT-SDK-SUCCESS]"
echo " "

echo "...[GENERATE-VENDOR-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/vendor-service-json -g typescript-axios -o ../sdk/vendor 
echo " "
echo "...[GENERATE-VENDOR-SDK-SUCCESS]"

echo "...[GENERATE-COMMUNICATION-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/communication-service-json -g typescript-axios -o ../sdk/communication 
echo " "
echo "...[GENERATE-COMMUNICATION-SDK-SUCCESS]"


echo "...[GENERATE-MARKETPLACE-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/marketplace-service-json -g typescript-axios -o ../sdk/marketplace 
echo " "
echo "...[GENERATE-MARKETPLACE-SDK-SUCCESS]"

echo " "
echo "...[GENERATE-SDKS-SUCCESSFUL]"