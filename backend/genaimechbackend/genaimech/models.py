from djongo import models


class User(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    reset_token = models.CharField(max_length=100, default="")
    reset_token_expires = models.DateTimeField("")
    updated_at = models.DateTimeField(auto_now=True)
    hashed_password = models.CharField(max_length=100)
    salt = models.CharField(max_length=100)

    def __str__(self):
        return self.name
