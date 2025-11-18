/**
 * @file databases/migrations/20251118-07-fk-tables.js
 * @description Add fk on all tables
 * 251117 v1.0.0 wook init
 */

/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출되는 메소드 (스키마 생성)
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      'posts', // fk 생성할 테이블
      {
        fields: ['user_id'],      // fk 부여할 컬럼
        type: 'foreign key',      // 사용할 constraint 종류
        name: 'fk_posts_user_id', // constraint명 지정(constraint종류_테이블명_컬럼명)
        references: {             // 참조 설정
          table: 'users',         // 참조할 테이블
          field: 'id',            // 참조할 컬럼
        },
        onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    ),
    await queryInterface.addConstraint(
      'likes', // fk 생성할 테이블
      {
        fields: ['user_id'],      // fk 부여할 컬럼
        type: 'foreign key',      // 사용할 constraint 종류
        name: 'fk_likes_user_id', // constraint명 지정(constraint종류_테이블명_컬럼명)
        references: {             // 참조 설정
          table: 'users',         // 참조할 테이블
          field: 'id',            // 참조할 컬럼
        },
        onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    ),
    await queryInterface.addConstraint(
      'comments', // fk 생성할 테이블
      {
        fields: ['user_id'],      // fk 부여할 컬럼
        type: 'foreign key',      // 사용할 constraint 종류
        name: 'fk_comments_user_id', // constraint명 지정(constraint종류_테이블명_컬럼명)
        references: {             // 참조 설정
          table: 'users',         // 참조할 테이블
          field: 'id',            // 참조할 컬럼
        },
        onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    ),
    await queryInterface.addConstraint(
      'push_subscriptions', // fk 생성할 테이블
      {
        fields: ['user_id'],      // fk 부여할 컬럼
        type: 'foreign key',      // 사용할 constraint 종류
        name: 'fk_push_subscriptions_user_id', // constraint명 지정(constraint종류_테이블명_컬럼명)
        references: {             // 참조 설정
          table: 'users',         // 참조할 테이블
          field: 'id',            // 참조할 컬럼
        },
        onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    ),
    await queryInterface.addConstraint(
      'notifications', // fk 생성할 테이블
      {
        fields: ['user_id'],      // fk 부여할 컬럼
        type: 'foreign key',      // 사용할 constraint 종류
        name: 'fk_notifications_user_id', // constraint명 지정(constraint종류_테이블명_컬럼명)
        references: {             // 참조 설정
          table: 'users',         // 참조할 테이블
          field: 'id',            // 참조할 컬럼
        },
        onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    ),
    await queryInterface.addConstraint(
      'likes', // fk 생성할 테이블
      {
        fields: ['post_id'],      // fk 부여할 컬럼
        type: 'foreign key',      // 사용할 constraint 종류
        name: 'fk_likes_post_id', // constraint명 지정(constraint종류_테이블명_컬럼명)
        references: {             // 참조 설정
          table: 'posts',         // 참조할 테이블
          field: 'id',            // 참조할 컬럼
        },
        onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    ),
    await queryInterface.addConstraint(
      'comments', // fk 생성할 테이블
      {
        fields: ['post_id'],      // fk 부여할 컬럼
        type: 'foreign key',      // 사용할 constraint 종류
        name: 'fk_comments_post_id', // constraint명 지정(constraint종류_테이블명_컬럼명)
        references: {             // 참조 설정
          table: 'posts',         // 참조할 테이블
          field: 'id',            // 참조할 컬럼
        },
        onDelete: 'CASCADE',      // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    )
  },
  // 마이그레이션을 롤백 시 호출되는 메소드 (스키마 제거, 수정)
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('posts', 'fk_posts_user_id'),
    await queryInterface.removeConstraint('likes', 'fk_likes_user_id'),
    await queryInterface.removeConstraint('comments', 'fk_comments_user_id'),
    await queryInterface.removeConstraint('push_subscriptions', 'fk_push_subscriptions_user_id'),
    await queryInterface.removeConstraint('notifications', 'fk_notifications_user_id')
    await queryInterface.removeConstraint('likes', 'fk_likes_post_id'),
    await queryInterface.removeConstraint('comments', 'fk_comments_post_id')
  }
}