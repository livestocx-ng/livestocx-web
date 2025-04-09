echo "...[REBUILDING-SDKS-PROCESSING]"
echo " "
echo " "
echo " "

echo "...[REBUILDING-AUTH-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/auth-service-json -g typescript-axios -o ../sdk/auth 

echo " "
echo "...[REBUILDING-AUTH-SDK-SUCCESS]"
echo " "
echo " "
echo " "

echo "...[REBUILDING-ACCOUNT-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/account-service-json -g typescript-axios -o ../sdk/account 

echo " "
echo "...[REBUILDING-ACCOUNT-SDK-SUCCESS]"
echo " "
echo " "
echo " "

echo "...[REBUILDING-VENDOR-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/vendor-service-json -g typescript-axios -o ../sdk/vendor 
echo " "
echo "...[REBUILDING-VENDOR-SDK-SUCCESS]"
echo " "
echo " "
echo " "

echo "...[REBUILDING-COMMUNICATION-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/communication-service-json -g typescript-axios -o ../sdk/communication 
echo " "
echo "...[REBUILDING-COMMUNICATION-SDK-SUCCESS]"
echo " "
echo " "
echo " "


echo "...[REBUILDING-MARKETPLACE-SDK-PROCESSING]"
echo " "
openapi-generator generate -i https://www.staging-api.livestocx.xyz/docs/marketplace-service-json -g typescript-axios -o ../sdk/marketplace 
echo " "
echo "...[REBUILDING-MARKETPLACE-SDK-SUCCESS]"
echo " "
echo " "
echo " "

echo " "
echo " "
echo " "
echo "...[REBUILDING-SDKS-SUCCESSFUL]"

echo " "
echo " "
echo " "
