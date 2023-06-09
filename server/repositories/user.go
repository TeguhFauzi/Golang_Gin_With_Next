package repositories

import (
	"dewetour/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	DeleteUser(user models.User) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Preload("Profile").Preload("Transaction").Find(&users).Error

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("Profile").Preload("Transaction").First(&user, ID).Error

	return user, err
}

func (r *repository) DeleteUser(user models.User) (models.User, error) {
	err := r.db.Delete(&user).Scan(&user).Error
	return user, err
}
// func (r *repository) GetUsers(ID int) (models.User, error) {
// 	var user models.User
// 	err := r.db.First(&user).Error

// 	return user, err
// }
// func (r *repository) CreateUser(user models.User) (models.User, error) {
// 	err := r.db.Create(&user).Error

// 	return user, err
// }

// func (r *repository) DeleteUser(user models.User) (models.User, error) {
// 	err := r.db.Delete(&user).Scan(&user).Error

// 	return user, err
// }