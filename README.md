# encrypted-notepad

- This is a desktop notepad application which uses cryptology. It base on Electron.

## Login
- It doesn't contain registration. It just need a password .Notes are encrypted and decrypted by the password.
- At first, the application want that you fill three password field. First field declare as string. Second and third fields must be integer. After, second and third numbers are multiplied each other. Finally, result of multiplication is converted to string and it is put together first field. 
- ###### Password = String(First Field) + String( Int(Second Field) * Int(Third Field) )
- Password must has thirty two character. Therefore, first password must has 16 character. The password are reversed and added to itself. The password is final password for login to the application.

## Encryption
- Notes are saved to json file. The password is used for key and note is used for value. While note was being added to json file, both key and value are encrypted with the password.

## Decryption
- When the application started, the application start to try to decrypt all keys of json with the password. If decrypted key equals to the password, the application appends the note to user's notes.

## Extra Informations
- The application uses aes256 package for both encryption and decryption.
- The repository doesn't contain electron-builder package. If you want to use the application on your desktop, you should combine that with electron-builder package.
